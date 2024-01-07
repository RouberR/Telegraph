export type UsersData = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  updatedAt: string;
  avatarUrl: string;
};

export type UsersResponse = {
  data: UsersData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    offset: number;
  };
};

export type CreateChatData = {
  title: string;
  type: string;
  participantId: string;
};

export type ChatResponse = {
  id: string;
  title: string;
  type: string;
  participants: Array<{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    updatedAt: string;
  }>;
  messages: Array<{
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    senderId: string;
    chatId: string;
  }>;
};

export enum TYPE_CHAT {
  DIRECT = 'Direct',
  GROUP = 'Group',
}
