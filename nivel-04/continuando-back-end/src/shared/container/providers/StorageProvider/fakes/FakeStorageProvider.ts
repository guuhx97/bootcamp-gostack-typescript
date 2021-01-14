import IStoregeProvider from '../models/IStoregeProvider';

export default class DiskStorageProvider implements IStoregeProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(store => store === file);
    this.storage.splice(findIndex, 1);
  }
}
