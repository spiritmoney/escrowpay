import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Avatar } from "../../components/ui/avatar";
import { supportApi } from "@/app/dashboard/support/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";

interface Message {
  id: string;
  content: string;
  sender: "USER" | "AGENT";
  timestamp: string;
  attachments?: Array<{ url: string; type: string }>;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chatTopic, setChatTopic] = useState("");
  const [initialMessage, setInitialMessage] = useState("");

  // Query for chat session
  const { data: chatSession, refetch: refetchSession } = useQuery({
    queryKey: ["chatSession", sessionId],
    queryFn: () => (sessionId ? supportApi.getChatSession(sessionId) : null),
    enabled: !!sessionId,
    refetchInterval: sessionId ? 3000 : false, // Poll every 3 seconds when session is active
  });

  // Mutations
  const initiateChatMutation = useMutation({
    mutationFn: supportApi.initiateChat,
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      toast.success("Chat session started");
    },
    onError: () => {
      toast.error("Failed to start chat");
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({
      sessionId,
      messageDto,
    }: {
      sessionId: string;
      messageDto: any;
    }) => supportApi.sendMessage(sessionId, messageDto),
    onSuccess: () => {
      setMessage("");
      refetchSession();
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const endChatMutation = useMutation({
    mutationFn: (sessionId: string) => supportApi.endChatSession(sessionId),
    onSuccess: () => {
      setSessionId(null);
      onClose();
      toast.success("Chat session ended");
    },
    onError: () => {
      toast.error("Failed to end chat");
    },
  });

  // Start chat session
  const handleStartChat = () => {
    if (!chatTopic || !initialMessage.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    initiateChatMutation.mutate({
      topic: chatTopic,
      initialMessage: initialMessage.trim()
    });
  };

  // Send message
  const handleSendMessage = () => {
    if (!sessionId || !message.trim()) return;

    sendMessageMutation.mutate({
      sessionId,
      messageDto: {
        content: message,
        attachments: [],
      },
    });
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Implement file upload logic here
      console.log("File selected:", file);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatSession?.messages]);

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-[380px] h-[500px] shadow-xl">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
          <span>Support Chat</span>
          {sessionId && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => sessionId && endChatMutation.mutate(sessionId)}
            >
              End Chat
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
        {!sessionId ? (
          <div className="flex-1 flex flex-col gap-4 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Select value={chatTopic} onValueChange={setChatTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Billing inquiry">Billing Inquiry</SelectItem>
                  <SelectItem value="Technical support">Technical Support</SelectItem>
                  <SelectItem value="Account issues">Account Issues</SelectItem>
                  <SelectItem value="General inquiry">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                placeholder="Briefly describe your issue..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleStartChat}
              disabled={!chatTopic || !initialMessage.trim() || initiateChatMutation.isPending}
              className="w-full"
            >
              {initiateChatMutation.isPending ? "Starting Chat..." : "Start Chat"}
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {chatSession?.messages?.map((msg: Message) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 mb-4 ${
                    msg.sender === "USER" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    {msg.sender === "AGENT" ? "A" : "U"}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 max-w-[70%] ${
                      msg.sender === "USER"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.content}
                    {msg.attachments?.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2 text-sm underline"
                      >
                        View Attachment
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>

            <div className="border-t p-4 flex gap-2">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
