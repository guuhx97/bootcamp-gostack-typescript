import ISignInCredentials from "./ISignInCredentials";

export default interface IAuthContext {
  user: object;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}
