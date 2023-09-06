export interface signUp {
  id: string;
  password: string
};

export interface IToken {
  accessToken: string, 
  refreshToken: string
}

export interface IUser {
  id: string
}

export interface IPaginate {
  userId: string
  list_size: number | 10
  page: number | 1
}

export interface IRemoveFile {
  userId: string
  id: string
}