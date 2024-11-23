export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
}

export function GridSmallBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
}

export function DotBackground({
  children,
  widthFull = true,
}: {
  children: React.ReactNode;
  widthFull: boolean;
}) {
  return (
    <div
      className={`dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex justify-center ${
        widthFull ? "w-full" : ""
      } `}
    >
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      {children}
    </div>
  );
}
