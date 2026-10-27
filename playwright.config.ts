import { defineConfig, devices } from "@playwright/test";
import * as path from "path";

/**
 * Playwright E2E configuration — Daily Tracker Tahap 1
 *
 * Jalankan: npx playwright test
 * Dengan UI:  npx playwright test --ui
 *
 * Variabel lingkungan yang diperlukan (buat .env.test.local):
 *   BASE_URL         — URL dev server (default http://localhost:3000)
 *   E2E_TEST_EMAIL   — email akun uji coba yang sudah terdaftar di Supabase
 *   E2E_TEST_PASSWORD— kata sandi akun tersebut
 */

export default defineConfig({
  testDir: path.join(__dirname, "tests/e2e"),
  testMatch: "**/*.spec.ts",

  /* Batas waktu per test */
  timeout: 30_000,

  /* Laporan gagal: tampilkan langkah yang gagal */
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    /* URL dasar untuk `page.goto("/login")` */
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",

    /* Rekam trace hanya saat gagal, untuk debugging */
    trace: "on-first-retry",

    /* Screenshot hanya saat gagal */
    screenshot: "only-on-failure",
  },

  /* Jalankan dev server otomatis sebelum test jika belum jalan */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 60_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
