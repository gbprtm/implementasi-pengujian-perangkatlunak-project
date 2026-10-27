import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    return NextResponse.json({
      data: {
        status: 'ok',
        authenticated: !!user && !error,
        timestamp: new Date().toISOString(),
      },
      error: null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'System health check failed';
    return NextResponse.json(
      {
        data: null,
        error: {
          code: 'HEALTH_CHECK_FAILED',
          message,
        },
      },
      { status: 500 }
    );
  }
}
