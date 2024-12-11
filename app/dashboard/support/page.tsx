"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle,
  Phone,
  FileText,
  Bell,
  Settings as LucideSettings,
} from "lucide-react";
import Link from "next/link";
import NotificationsModal from "../../../components/NotificationsModal";
import SettingsModal from "../../../components/SettingsModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supportApi } from "./api";
import { useState } from "react";
import { toast } from "sonner";
import { Ticket, TicketsResponse } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingChatButton } from "../../components/FloatingChatButton";
import { ChatWindow } from "../../components/ChatWindow";

const SupportPage: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Properly typed query with loading state
  const {
    data: ticketsData,
    error,
    isLoading,
  } = useQuery<TicketsResponse, Error>({
    queryKey: ["tickets"],
    queryFn: () => supportApi.getTickets(),
    retry: 1,
  });

  // Show error toast when error exists
  React.useEffect(() => {
    if (error) {
      toast.error("Failed to fetch tickets", {
        description: "Please try again later",
      });
    }
  }, [error]);

  // Access tickets array safely with type assertion
  const tickets = (ticketsData?.tickets ?? []) as Ticket[];

  // Mutation for creating a ticket
  const createTicketMutation = useMutation({
    mutationFn: (data: { subject: string; message: string }) =>
      supportApi.createTicket(data),
    onSuccess: () => {
      setSubject("");
      setMessage("");
      toast.success("Ticket Created", {
        description: "We'll get back to you soon!",
      });
    },
    onError: () => {
      toast.error("Failed to create ticket", {
        description: "Please try again later",
      });
    },
  });

  // Mutation for initiating chat
  const initiateChatMutation = useMutation({
    mutationFn: (data: { topic: string; initialMessage: string }) =>
      supportApi.initiateChat(data),
    onSuccess: (data) => {
      toast.success("Chat Initiated", {
        description: "You'll be connected with an agent shortly",
      });
      // Handle chat initiation success
      console.log("Chat initiated:", data);
    },
    onError: () => {
      toast.error("Failed to start chat", {
        description: "Please try again later",
      });
    },
  });

  const handleSubmitTicket = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Validation Error", {
        description: "Please fill in all fields",
      });
      return;
    }

    createTicketMutation.mutate({
      subject,
      message,
    });
  };

  const handleStartChat = () => {
    initiateChatMutation.mutate({
      topic: "General Support",
      initialMessage: "Hi, I need assistance",
    });
  };

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CLOSED":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Support
          </h1>
          <div className="flex items-center space-x-2">
            <NotificationsModal />
            <SettingsModal />
            <Button
              variant="outline"
              className="h-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50 px-3 md:px-4"
              asChild
            >
              <Link
                href="/api-docs"
                target="_blank"
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="hidden md:inline text-blue-600">
                  Documentation
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-gray-900">Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Describe your issue..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSubmitTicket}
                disabled={createTicketMutation.isPending}
              >
                {createTicketMutation.isPending
                  ? "Submitting..."
                  : "Submit Ticket"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4 md:space-y-6">
            <Card className="bg-white border-blue-100">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-gray-900">
                  Quick Support Options
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={handleStartChat}
                  disabled={initiateChatMutation.isPending}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {initiateChatMutation.isPending
                    ? "Initiating Chat..."
                    : "Start Live Chat"}
                </Button>
                {/* <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button> */}
                <Link href="/#faq">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50 mt-3"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Browse FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-gray-900">Support Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Average Response Time
                    </span>
                    <span className="text-sm">2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Support Hours</span>
                    <span className="text-sm">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tickets Section */}
        <Card className="bg-white border-blue-100">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-gray-900">
              Your Support Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : tickets.length === 0 ? (
              // Empty state
              <div className="text-center py-6">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No tickets
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't created any support tickets yet.
                </p>
              </div>
            ) : (
              // Tickets table
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket #</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">
                          {ticket.ticketNumber}
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(ticket.status)}
                          >
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(ticket.updatedAt), "MMM d, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chat Components */}
      <FloatingChatButton
        onClick={() => setIsChatOpen(!isChatOpen)}
        isOpen={isChatOpen}
      />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </DashboardLayout>
  );
};

export default SupportPage;
