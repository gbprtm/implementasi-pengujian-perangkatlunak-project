export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center max-w-5xl mx-auto">
        <span className="font-bold text-indigo-600 text-lg">Daily Tracker</span>
      </header>
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  );
}
