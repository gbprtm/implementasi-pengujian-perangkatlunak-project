import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '@/lib/validation/auth';

describe('Auth Validation Schemas', () => {
  it('validates correct login input', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email for login', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password for login', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '123',
    });
    expect(result.success).toBe(false);
  });

  it('validates register input with name', () => {
    const result = registerSchema.safeParse({
      email: 'user@domain.com',
      password: 'securepassword',
      nama: 'Budi Santoso',
    });
    expect(result.success).toBe(true);
  });
});
