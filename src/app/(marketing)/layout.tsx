import { Navbar } from "@/components/marketing/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#0B0B0B] text-[#F6F2EB] min-h-screen">
      <div className="film-grain pointer-events-none" />
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
