"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../globals.css";

const navLinks = [
  {
    name: "Register",
    href: "/signup",
  },
  {
    name: "Login",
    href: "/signin",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div>
      {children}

      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
