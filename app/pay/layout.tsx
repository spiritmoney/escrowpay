import React from "react";
import Link from "next/link";

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-gray-900">
              Escrow
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          &copy; 2024 Escrow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
