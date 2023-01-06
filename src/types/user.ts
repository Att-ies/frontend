export interface Member extends User {
  keywords: string[];
}

export type User = {
  userId: string;
  password: string;
  email: string;
  nickname: string;
  telephone: string;
};

export type Artist = {
  education: string;
  history: string;
  description: string;
  instagram: string;
  behance: string;
};
