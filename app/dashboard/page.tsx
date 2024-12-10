"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";
import OverviewPanel from "../components/OverviewPanel";
import CheckoutInsights from "../components/CheckoutInsights";
import TransactionsList from "../components/TransactionsList";
import Settings from "../components/Settings";
import SupportAccess from "../components/SupportAccess";
import Link from "next/link";
import { 
  FileText, 
  Bell, 
  Settings as LucideSettings,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Link as LinkIcon,
  Users,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationsModal from "../../components/NotificationsModal";
import SettingsModal from "../../components/SettingsModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import LoadingSpinner from "../components/LoadingSpinner";

const RecentPaymentLinks: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payment Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              name: "Premium Product",
              amount: "$99.99",
              status: "Active",
              created: "2 days ago",
              clicks: 45
            },
            {
              name: "Consulting Service",
              amount: "$150.00",
              status: "Active",
              created: "1 week ago",
              clicks: 128
            },
            {
              name: "Digital Download",
              amount: "$25.00",
              status: "Inactive",
              created: "2 weeks ago",
              clicks: 89
            }
          ].map((link, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{link.name}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{link.amount}</span>
                  <span>•</span>
                  <span>{link.created}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  link.status === 'Active' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {link.status}
                </span>
                <p className="text-sm text-gray-500 mt-1">{link.clicks} clicks</p>
              </div>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
          asChild
        >
          <Link href="/dashboard/payment-link">
            View All Payment Links
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const RevenueAnalytics: React.FC = () => {
  const data = [
    { name: "Jan", revenue: 2400 },
    { name: "Feb", revenue: 3200 },
    { name: "Mar", revenue: 2900 },
    { name: "Apr", revenue: 3800 },
    { name: "May", revenue: 3500 },
    { name: "Jun", revenue: 4200 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar 
              dataKey="revenue" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Monthly Growth</p>
            <p className="text-2xl font-bold text-blue-700">+12.5%</p>
            <p className="text-xs text-blue-600">vs last month</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Success Rate</p>
            <p className="text-2xl font-bold text-green-700">98.2%</p>
            <p className="text-xs text-green-600">transaction success</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    // Replace this with your actual authentication check
    const isAuthenticated = localStorage.getItem("token") || false;
    
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [router]);

  // Add a loading state to prevent flash of content
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Replace this with your actual authentication check
      const isAuthenticated = localStorage.getItem("token") || false;
      
      if (!isAuthenticated) {
        router.push("/auth/signin");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <NotificationsModal />
            <SettingsModal />
            <Button
              variant="outline"
              className="h-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50 px-3 md:px-4"
              asChild
            >
              <Link href="/api-docs" target="_blank" className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="hidden md:inline text-blue-600">Documentation</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="bg-white border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345.67</div>
              <p className="text-xs text-gray-500">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-sm font-medium">Active Payment Links</CardTitle>
              <LinkIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500">3 created this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-gray-500">+5% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-gray-500">+12 this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4">
              <CardTitle className="text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {[
                  { desc: "Payment Received", time: "2 hours ago", amount: "+$500.00" },
                  { desc: "New Payment Link", time: "5 hours ago", status: "Created" },
                  { desc: "Customer Signup", time: "1 day ago", name: "Jane Smith" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{activity.desc}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className="font-medium">
                      {activity.amount || activity.status || activity.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100">
            <CardHeader className="p-4">
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/dashboard/payment-link" className="flex items-center">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Create Payment Link
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-blue-200">
                <Link href="/dashboard/transactions" className="flex items-center">
                  <Activity className="mr-2 h-4 w-4" />
                  View Transactions
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-blue-200">
                <Link href="/dashboard/balance" className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Manage Balance
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentPaymentLinks />
          <RevenueAnalytics />
        </div>
        <TransactionsList />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Settings />
          <SupportAccess />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
