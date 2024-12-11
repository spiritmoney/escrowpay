export interface CreateSupportTicketDto {
  subject: string;
  message: string;
}

export interface InitiateChatDto {
  topic: string;
  initialMessage: string;
}

export interface ChatMessageDto {
  content: string;
  attachments?: Array<{
    url: string;
    type: string;
  }>;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'CLOSED' | 'IN_PROGRESS';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TicketsResponse {
  tickets: Ticket[];
}

export interface ChatSession {
  sessionId: string;
  status: string;
  messages: Array<{
    id: string;
    content: string;
    sender: 'USER' | 'AGENT';
    timestamp: string;
    attachments?: Array<{
      url: string;
      type: string;
    }>;
  }>;
}

export interface InitiateChatResponse {
  sessionId: string;
  status: string;
  createdAt: string;
  estimatedWaitTime: string;
}

export interface SendMessageResponse {
  messageId: string;
  content: string;
  timestamp: string;
  status: string;
}

export interface EndChatResponse {
  sessionId: string;
  status: string;
  endedAt: string;
}
