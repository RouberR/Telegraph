export interface Participant {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  chatId: string;
}

export interface FormattedMessage {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}


export const isEmailValid = (email: string) => {
  if (!email?.length) {
    return false;
  }
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailPattern.test(email);
};


export const composeUserDisplayName = (firstName?:string, lastName?:string, userName?:string) => {
  const mergedName = `${firstName || ''} ${lastName || ''}`;
  const userString = userName ? `(${userName})` : '';

  return `${mergedName.trim()} ${userString.trim()}`.trim();
};


export const formatMessage = (message: Message, participants: Participant[]): FormattedMessage => {
  const getMessageUser = (senderId: string) => {
    const participant = participants.find((participant) => participant.id === senderId);
    return {
      _id: senderId,
      name: participant?.userName || '',
      avatar: participant?.avatarUrl || '',
    };
  };

  return {
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.createdAt),
    user: getMessageUser(message.senderId),
  };
};

