import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BadgeDollarSign,
  SendToBack,
  LinkIcon,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";
import HeaderActions from "./HeaderActions";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BadgeDollarSign, label: "Balance", href: "/dashboard/balance" },
    { icon: SendToBack, label: "Transactions", href: "/dashboard/transactions" },
    { icon: LinkIcon, label: "Payment Link", href: "/dashboard/payment-link" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-16 md:w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">
            <span className="block md:hidden">EP</span>
            <span className="hidden md:block">EspeesPay</span>
          </h1>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  pathname === item.href ? "bg-gray-200" : ""
                }`}
              >
                <item.icon className="w-5 h-5 md:mr-3" />
                <span className="hidden md:inline">{item.label}</span>
              </span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full md:p-4 p-2">
          <Button
            variant="outline"
            className="w-full md:flex md:items-center md:justify-center md:px-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:ml-2 md:inline">Log out</span>
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gray-100 border-b border-gray-200">
          <div className="flex justify-end items-center p-4">
            <HeaderActions />
          </div>
        </div>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 