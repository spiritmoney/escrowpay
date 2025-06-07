import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Wallet,
  SendToBack,
  LinkIcon,
  BadgeDollarSign,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Wallet, label: "Balance", href: "/dashboard/balance" },
    { icon: SendToBack, label: "Transactions", href: "/dashboard/transactions" },
    { icon: LinkIcon, label: "Payment Link", href: "/dashboard/payment-link" },
    // { icon: BadgeDollarSign, label: "Plan", href: "/dashboard/plan" },
    // { icon: User, label: "Profile", href: "/dashboard/profile" },
    // { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className="w-16 md:w-64 bg-white shadow-md"
      >
        <div className="md:p-4">
          <h1 className="text-2xl font-bold text-blue-600">
            <span className="block md:hidden text-[14px] text-center py-4">Escrow</span>
            <span className="hidden md:block">Escrow</span>
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
            className="md:flex md:items-center md:justify-center md:px-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:ml-2 md:inline">Log out</span>
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
