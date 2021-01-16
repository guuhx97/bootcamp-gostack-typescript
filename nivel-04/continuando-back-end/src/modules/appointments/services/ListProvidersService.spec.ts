import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be to able list the providers', async () => {
    const userOne = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: '123456',
    });

    const userTwo = await fakeUserRepository.create({
      name: 'John tree',
      email: 'johntree@exemple.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Four',
      email: 'johnfrou@exemple.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);
  });
});
