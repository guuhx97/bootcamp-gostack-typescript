import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
