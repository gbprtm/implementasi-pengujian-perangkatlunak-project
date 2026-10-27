import { test, expect } from "@playwright/test";

const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "e2e-test@example.com";
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "password-e2e-123";

// ─── Autentikasi ────────────────────────────────────────────────────────────

test.describe("Autentikasi — Tahap 1", () => {
  test("halaman login dapat dibuka", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toContainText("Daily Tracker");
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Kata Sandi")).toBeVisible();
    await expect(page.locator("#btn-login")).toBeVisible();
  });

  test("halaman register dapat dibuka", async ({ page }) => {
    await page.goto("/register");
    await expect(page.locator("h1")).toContainText("Daily Tracker");
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Kata Sandi")).toBeVisible();
    await expect(page.getByLabel("Konfirmasi Kata Sandi")).toBeVisible();
    await expect(page.locator("#btn-register")).toBeVisible();
  });

  test("login dengan email/password salah menampilkan pesan error", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("salah@email.com");
    await page.getByLabel("Kata Sandi").fill("salahpassword123");
    await page.locator("#btn-login").click();
    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("validasi client-side: email kosong menampilkan error", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.locator("#btn-login").click();
    await expect(page.getByText(/email wajib diisi/i)).toBeVisible();
  });

  test("validasi client-side: kata sandi < 8 karakter pada register", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByLabel("Email").fill("tes@email.com");
    await page.getByLabel("Kata Sandi").fill("abc");
    await page.getByLabel("Konfirmasi Kata Sandi").fill("abc");
    await page.locator("#btn-register").click();
    await expect(page.getByText(/minimal 8 karakter/i)).toBeVisible();
  });

  test("validasi client-side: konfirmasi kata sandi tidak cocok", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByLabel("Email").fill("tes@email.com");
    await page.getByLabel("Kata Sandi").fill("password123");
    await page.getByLabel("Konfirmasi Kata Sandi").fill("berbeda456");
    await page.locator("#btn-register").click();
    await expect(page.getByText(/tidak cocok/i)).toBeVisible();
  });
});

// ─── Proteksi Rute ───────────────────────────────────────────────────────────

test.describe("Proteksi rute — Tahap 1", () => {
  test("rute /dashboard tanpa sesi diarahkan ke /login", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/\/login/);
    await expect(page.url()).toContain("/login");
  });

  test("rute /onboarding tanpa sesi diarahkan ke /login", async ({ page }) => {
    await page.goto("/onboarding");
    await page.waitForURL(/\/login/);
    await expect(page.url()).toContain("/login");
  });

  test("pengguna yang sudah login diarahkan ke /dashboard saat buka /login", async ({
    page,
  }) => {
    // Login terlebih dahulu
    await page.goto("/login");
    await page.getByLabel("Email").fill(TEST_EMAIL);
    await page.getByLabel("Kata Sandi").fill(TEST_PASSWORD);
    await page.locator("#btn-login").click();
    await page.waitForURL(/\/dashboard/);

    // Kunjungi /login lagi — seharusnya redirect ke dashboard
    await page.goto("/login");
    await page.waitForURL(/\/dashboard/);
    await expect(page.url()).toContain("/dashboard");
  });
});

// ─── Alur Lengkap Login–Logout ───────────────────────────────────────────────

test.describe("Alur login dan logout — Tahap 1", () => {
  test("login berhasil diarahkan ke /dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(TEST_EMAIL);
    await page.getByLabel("Kata Sandi").fill(TEST_PASSWORD);
    await page.locator("#btn-login").click();
    await page.waitForURL(/\/dashboard/);
    await expect(page.url()).toContain("/dashboard");
  });

  test("logout menghapus sesi dan kembali ke /login", async ({ page }) => {
    // Login
    await page.goto("/login");
    await page.getByLabel("Email").fill(TEST_EMAIL);
    await page.getByLabel("Kata Sandi").fill(TEST_PASSWORD);
    await page.locator("#btn-login").click();
    await page.waitForURL(/\/dashboard/);

    // Logout via tombol di sidebar (desktop)
    await page.locator("#btn-logout").click();
    await page.waitForURL(/\/login/);
    await expect(page.url()).toContain("/login");

    // Akses dashboard setelah logout → redirect ke login
    await page.goto("/dashboard");
    await page.waitForURL(/\/login/);
    await expect(page.url()).toContain("/login");
  });
});

// ─── Responsivitas ───────────────────────────────────────────────────────────

test.describe("Tampilan responsif — Tahap 1", () => {
  test("halaman login tidak rusak pada lebar 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/login");
    await expect(page.locator("#btn-login")).toBeVisible();
    const form = page.locator("form");
    const box = await form.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(360);
  });

  test("halaman login tidak rusak pada lebar 1280px", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");
    await expect(page.locator("#btn-login")).toBeVisible();
  });
});
