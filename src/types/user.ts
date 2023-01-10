export interface Member extends User, Artist {
  keywords: string[];
}

export interface User {
  userId: string;
  password: string;
  email: string;
  nickname: string;
  telephone: string;
}

export interface Artist {
  education: string;
  history: string;
  description: string;
  instagram: string;
  behance: string;
}
