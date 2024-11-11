export type userBody = {
  email: string;
  name: string;
  password: string;
};

export interface Payload {
  token: string;
  id: number;
}

export interface loginProp {
  password: string;
  email: string;
}
