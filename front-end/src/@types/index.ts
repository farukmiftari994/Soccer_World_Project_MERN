import { Player, User } from "./users";

export declare type ResNotOk = {
  error: string;
};

export declare type UploadFileResponse = {
  message: string;
  error: boolean;
  data: {
    image: string;
  };
};

export declare type SignupResponse = {
  message: string;
  user: User;
};

export declare type PlayerResponse = {
  message: string;
  player: Player;
};
