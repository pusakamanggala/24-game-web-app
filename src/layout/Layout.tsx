import Header from "../components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="container flex flex-col items-center justify-center flex-1 py-5 space-y-5 ">
        {children}
      </main>
    </div>
  );
}
