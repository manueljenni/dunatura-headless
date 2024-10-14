import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center">{children}</main>
      <Footer />
    </section>
  );
}
