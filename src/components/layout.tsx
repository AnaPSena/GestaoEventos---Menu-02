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
      <main className="bg-white flex-grow py-4 px-8">{children}</main>
      <Footer />
    </div>
  );
}
