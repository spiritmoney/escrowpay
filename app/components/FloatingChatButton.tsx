import { MessageCircle } from "lucide-react";
import { Button } from "../../components/ui/button";

interface FloatingChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FloatingChatButton = ({
  onClick,
  isOpen,
}: FloatingChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg ${
        isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      <MessageCircle className={`h-6 w-6 ${isOpen ? "rotate-45" : ""}`} />
    </Button>
  );
};
