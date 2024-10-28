import { Footer } from "./footer";
import { Navbar } from "./navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-white flex-grow py-8 px-12 m-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
