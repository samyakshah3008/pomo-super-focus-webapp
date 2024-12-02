type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default function UnauthenticatedLayout({
  children,
}: UnauthenticatedLayoutProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* <div className="bg-yellow-300 w-full p-2 text-center text-sm rounded-bl-md rounded-br-md ">
        Please note that since we are running on initial plan for the
        deployments, Verified Account access is disabled temporarily. So please
        use Guest Login to try our product, incase you need full access you can
        request us for beta access at samyakshah3008@gmail.com
      </div> */}
      <main className="flex flex-col items-center justify-center h-screen">
        {children}
      </main>
    </div>
  );
}
