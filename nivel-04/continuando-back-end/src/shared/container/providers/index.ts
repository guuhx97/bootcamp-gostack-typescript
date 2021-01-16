import { container } from 'tsyringe';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStoregeProvider from './StorageProvider/models/IStoregeProvider';

container.registerSingleton<IStoregeProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
