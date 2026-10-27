import { AuthRepository } from '../repositories/authRepository';

export class AuthService {
  constructor(private authRepo: AuthRepository) {}

  async getCurrentUserWithProfile() {
    const user = await this.authRepo.getUserSession();
    if (!user) {
      return { user: null, profile: null };
    }

    const profile = await this.authRepo.getProfile(user.id);
    return { user, profile };
  }
}
