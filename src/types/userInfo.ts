export interface userInfoForm {
  userId: string;
  nickname: string;
  password: string;
  telephone: string;
  email: string;
}

export interface memberInfoForm extends userInfoForm {
  keywords: string[];
}

export interface artistInfoForm extends userInfoForm {
  education: string;
  history: string;
  description: string;
  instagram?: string;
  behance?: string;
}
