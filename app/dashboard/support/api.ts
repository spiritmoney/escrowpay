import { CreateSupportTicketDto, InitiateChatDto, ChatMessageDto, TicketsResponse, InitiateChatResponse, ChatSession, SendMessageResponse, EndChatResponse } from './types';

const BASE_URL = "https://api.paylinc.org";

export const supportApi = {
  // Support Tickets
  createTicket: async (createTicketDto: CreateSupportTicketDto) => {
    const response = await fetch(`${BASE_URL}/support/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(createTicketDto),
    });
    return response.json();
  },

  getTickets: async (): Promise<TicketsResponse> => {
    const response = await fetch(`${BASE_URL}/support/tickets`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    return response.json();
  },

  // Live Chat
  initiateChat: async (initiateChatDto: InitiateChatDto): Promise<InitiateChatResponse> => {
    const response = await fetch(`${BASE_URL}/support/live-chat/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(initiateChatDto),
    });
    if (!response.ok) {
      throw new Error('Failed to initiate chat');
    }
    return response.json();
  },

  getChatSession: async (sessionId: string): Promise<ChatSession> => {
    const response = await fetch(`${BASE_URL}/support/live-chat/session/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch chat session');
    }
    return response.json();
  },

  sendMessage: async (sessionId: string, messageDto: ChatMessageDto): Promise<SendMessageResponse> => {
    const response = await fetch(`${BASE_URL}/support/live-chat/session/${sessionId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(messageDto),
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  },

  endChatSession: async (sessionId: string): Promise<EndChatResponse> => {
    const response = await fetch(`${BASE_URL}/support/live-chat/session/${sessionId}/end`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to end chat session');
    }
    return response.json();
  },
};
