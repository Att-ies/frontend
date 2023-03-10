interface Chat {
  artistId: number;
  artWorkId: number;
}

interface ChatRoom {
  chatRoomId: number;
  artWorkImage: string;
  unreadCount: number;
  otherMember: {
    id: number;
    name: string;
    image: string;
  };
  lastMessage: {
    content: string;
    sendDate: string;
    type: string;
  };
}

interface ChatRoomList {
  chatRooms: ChatRoom[];
}

interface Message {
  sendDate: string;
  senderId: number;
  content: string;
  type: string;
}

interface ChatRoomById {
  chatRoomId: number;
  artist: {
    id: number;
    name: string;
    responseTime: string;
  };
  member: {
    id: number;
    name: string;
    responseTime: string;
  };
  messages: Message[];
}

interface chatData {
  chatRoomId: number;
}
