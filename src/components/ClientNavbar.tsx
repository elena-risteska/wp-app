"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  const noNavRoutes = ["/login", "/register", "/forgot-password"];

  if (noNavRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}
