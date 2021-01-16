import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfile';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@exemple.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-exisinting',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
