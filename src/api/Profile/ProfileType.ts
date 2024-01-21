import { ChatResponse, ParticipantType, TYPE_CHAT } from '../Chat/ChatType';

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  updatedAt: string;
  avatarUrl: string;
  chats: ChatResponse[]
};

export type UpdateUserRequest = {
  firstName?: string;
  lastName?: string;
  password?: string;
  file?: string;
};
