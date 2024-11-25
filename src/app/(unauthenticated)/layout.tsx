type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default function UnauthenticatedLayout({
  children,
}: UnauthenticatedLayoutProps) {
  return (
    <>
      <div className="fixed top-0 bg-yellow-300 w-full p-2 text-center text-sm rounded-bl-md rounded-br-md ">
        Please note that since we are running on initial plan for the
        deployments, we cannot face heavy traffic for now. So please use Guest
        Login to try our product, we promise to give you a verified account
        access to the soonest!
      </div>
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 md:p-12 lg:p-24">
        <div>
          <div className="absolute -inset-[min(600px,max(400px,60vw))] -z-[1] flex items-center justify-center opacity-70"></div>

          <div className="relative w-full">{children}</div>
        </div>
      </main>
    </>
  );
}
