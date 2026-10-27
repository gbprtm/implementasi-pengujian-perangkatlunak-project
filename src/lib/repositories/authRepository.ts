import { SupabaseClient } from '@supabase/supabase-js';

export class AuthRepository {
  constructor(private supabase: SupabaseClient) {}

  async getUserSession() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) return null;
    return user;
  }

  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) return null;
    return data;
  }
}
