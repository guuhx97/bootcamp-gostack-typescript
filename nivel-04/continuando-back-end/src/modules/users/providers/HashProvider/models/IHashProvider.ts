export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  comparedHash(payload: string, hashed: string): Promise<boolean>;
}
