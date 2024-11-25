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
        deployments, Verified Account access is disabled temporarily. So please
        use Guest Login to try our product, incase you need full access you can
        request us for beta access at samyakshah3008@gmail.com
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
