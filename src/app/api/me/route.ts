import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { AuthRepository } from '@/lib/repositories/authRepository';
import { AuthService } from '@/lib/services/authService';

export async function GET() {
  try {
    const supabase = await createClient();
    const authRepo = new AuthRepository(supabase);
    const authService = new AuthService(authRepo);

    const { user, profile } = await authService.getCurrentUserWithProfile();

    if (!user) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Sesi tidak valid atau telah berakhir',
          },
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      data: {
        id: user.id,
        email: user.email,
        profile,
      },
      error: null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal mengambil data profil';
    return NextResponse.json(
      {
        data: null,
        error: {
          code: 'INTERNAL_ERROR',
          message,
        },
      },
      { status: 500 }
    );
  }
}
