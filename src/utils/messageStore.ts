// Centralized message store for synchronization across all user types

export interface GlobalMessage {
  id: string;
  from: string; // Email or name
  fromType: "student" | "parent" | "teacher";
  to: string; // Email or name
  toType: "student" | "parent" | "teacher";
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  replies: {
    from: string;
    fromType: "student" | "parent" | "teacher";
    message: string;
    timestamp: string;
  }[];
}

const MESSAGE_STORE_KEY = "globalMessages";

export const getMessages = (): GlobalMessage[] => {
  const stored = localStorage.getItem(MESSAGE_STORE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveMessages = (messages: GlobalMessage[]): void => {
  localStorage.setItem(MESSAGE_STORE_KEY, JSON.stringify(messages));
};

export const addMessage = (message: Omit<GlobalMessage, "id" | "timestamp" | "isRead" | "replies">): GlobalMessage => {
  const messages = getMessages();
  const newMessage: GlobalMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    isRead: false,
    replies: []
  };
  messages.unshift(newMessage);
  saveMessages(messages);
  return newMessage;
};

export const addReply = (messageId: string, reply: { from: string; fromType: "student" | "parent" | "teacher"; message: string }): void => {
  const messages = getMessages();
  const messageIndex = messages.findIndex(m => m.id === messageId);
  if (messageIndex !== -1) {
    messages[messageIndex].replies.push({
      ...reply,
      timestamp: new Date().toISOString()
    });
    saveMessages(messages);
  }
};

export const markAsRead = (messageId: string): void => {
  const messages = getMessages();
  const messageIndex = messages.findIndex(m => m.id === messageId);
  if (messageIndex !== -1) {
    messages[messageIndex].isRead = true;
    saveMessages(messages);
  }
};

export const getMessagesForUser = (email: string, userType: "student" | "parent" | "teacher"): GlobalMessage[] => {
  const messages = getMessages();
  return messages.filter(m => 
    (m.to.toLowerCase() === email.toLowerCase() && m.toType === userType) ||
    (m.from.toLowerCase() === email.toLowerCase() && m.fromType === userType)
  );
};
