import SideNav from "@/components/layouts/side-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <SideNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
