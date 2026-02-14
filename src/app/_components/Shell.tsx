import Link from "next/link";

export default function Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold">
            Class Scheduler
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/students" className="hover:underline">
              Students
            </Link>
            <Link href="/classes" className="hover:underline">
              Classes
            </Link>
            <Link href="/assignments" className="hover:underline">
              Assignments
            </Link>
            <Link href="/outstanding" className="hover:underline">
              Outstanding
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
