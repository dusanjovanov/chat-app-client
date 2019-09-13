export type Message = {
  id: string;
  user: User;
  text: string;
  sentAt: string;
};

export type MessageBlock = Message[];

export type User = {
  id: string;
  displayName: string;
  avatar: string;
  colors: {
    bg: string;
    front: string;
  };
};
