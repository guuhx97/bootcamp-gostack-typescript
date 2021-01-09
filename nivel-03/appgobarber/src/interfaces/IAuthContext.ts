import ISignInCredentials from "./ISignInCredentials";

export default interface IAuthContext {
  user: object;
  loading: boolean,
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}
