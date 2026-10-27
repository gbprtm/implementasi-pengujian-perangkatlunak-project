export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          Selamat Datang 👋
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Ayo lengkapi profil Anda agar Daily Tracker dapat memberikan
          rekomendasi yang tepat.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8" aria-label="Langkah pendaftaran">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={[
                  "h-2 w-2 rounded-full",
                  step === 1 ? "bg-indigo-600" : "bg-slate-200",
                ].join(" ")}
                aria-hidden="true"
              />
              {step < 3 && (
                <div className="h-px w-6 bg-slate-200" aria-hidden="true" />
              )}
            </div>
          ))}
          <span className="ml-1 text-xs text-slate-400">Langkah 1 dari 3</span>
        </div>

        {/* Placeholder content */}
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-400">
          <p className="text-sm">
            Formulir profil akan tersedia pada Tahap 2 – Profil dan Onboarding.
          </p>
        </div>
      </div>
    </div>
  );
}
