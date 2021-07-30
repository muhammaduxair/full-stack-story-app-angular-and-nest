export interface createUserInt {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface loginUserINT {
  email: string;
  password: string;
}

export interface StoryINT {
  _id?: string;
  title: string;
  description: string;
  visibility: string;
  createdAt: string;
  user_name: string;
  user_id: string;
}
