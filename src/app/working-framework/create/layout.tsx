import NavigateBackBtn from "../../../components/(working-framework)/navigate-back-btn";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="p-4">
      <NavigateBackBtn />
      {children}
    </div>
  );
};

export default Layout;
