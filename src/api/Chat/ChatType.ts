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
  lastMessage: {
    content: string
  }
  participants: {
    users: ParticipantType[]
  };
  messages: Array<{
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    senderId: string;
    chatId: string;
  }>;
};

export type ParticipantType = UsersData

export enum TYPE_CHAT {
  DIRECT = 'Direct',
  GROUP = 'Group',
}
