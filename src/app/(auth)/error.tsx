"use client";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div>
      Custom Error on Auth {error.message}{" "}
      <button onClick={reset}>Try again</button>{" "}
    </div>
  );
};

export default ErrorBoundary;
