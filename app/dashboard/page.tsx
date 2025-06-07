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
  Activity,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationsModal from "../../components/NotificationsModal";
import SettingsModal from "../../components/SettingsModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  useDashboardStats,
  useRecentActivity,
  useRevenueAnalytics,
  useRecentPaymentLinks,
  getRelativeTimeString,
} from "./api";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "@/app/hooks/useAuthState";
import { EmptyState } from "@/app/components/EmptyState";

const RecentPaymentLinks: React.FC = () => {
  const { data: links, isLoading, error } = useRecentPaymentLinks();

  if (isLoading) return <Skeleton className="w-full h-[200px]" />;
  if (error) return <div>Error loading payment links</div>;
  if (!links?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Payment Links</CardTitle>
        </CardHeader>
        <div className="flex flex-col items-center justify-center">
          <CardContent className="w-full my-20">
            <EmptyState
              icon={LinkIcon}
              title="No payment links"
              description="Create your first payment link to start accepting payments."
              compact
            />
            <Button
              variant="outline"
              className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
              asChild
            >
              <Link href="/dashboard/payment-link">Create Payment Link</Link>
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payment Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{link.name}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>
                    {link.currency || link.defaultCurrency}{" "}
                    {link.amount || link.defaultAmount}
                  </span>
                  <span>•</span>
                  <span>{getRelativeTimeString(link.createdAt)}</span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    link.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {link.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
          asChild
        >
          <Link href="/dashboard/payment-link">View All Payment Links</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const RevenueAnalytics: React.FC = () => {
  const { data: revenueStats, isLoading, error } = useRevenueAnalytics();

  if (isLoading) return <Skeleton className="w-full h-[200px]" />;
  if (error) return <div>Error loading revenue data</div>;
  if (!revenueStats?.data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <EmptyState
              icon={BarChart3}
              title="No revenue data"
              description="Start accepting payments to see your revenue analytics."
              compact
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">
                  Monthly Growth
                </p>
                <p className="text-2xl font-bold text-blue-700">0%</p>
                <p className="text-xs text-blue-600">vs last month</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-green-700">0%</p>
                <p className="text-xs text-green-600">transaction success</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueStats.data}>
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
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Monthly Growth</p>
            <p className="text-2xl font-bold text-blue-700">
              {revenueStats.monthlyGrowth.toFixed(1)}%
            </p>
            <p className="text-xs text-blue-600">vs last month</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Success Rate</p>
            <p className="text-2xl font-bold text-green-700">
              {revenueStats.successRate.toFixed(1)}%
            </p>
            <p className="text-xs text-green-600">transaction success</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  const { isLoading: authLoading } = useAuthState();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentActivity, isLoading: activityLoading } =
    useRecentActivity();

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <NotificationsModal />
            <SettingsModal />
            <Button
              variant="outline"
              className="h-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50 px-3 md:px-4"
              asChild
            >
              <Link
                href="/api-docs"
                target="_blank"
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="hidden md:inline text-blue-600">
                  Documentation
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {statsLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">
                    $
                    {stats?.totalBalance.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats?.totalBalance.change.toFixed(1)}% from last month
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Payment Links
              </CardTitle>
              <LinkIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {statsLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.activePaymentLinks.count}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats?.activePaymentLinks.newCount} created this week
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Transactions
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {statsLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.totalTransactions.count}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats?.totalTransactions.change.toFixed(1)}% from last week
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-gray-900 text-lg font-semibold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {activityLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : !recentActivity || recentActivity.length === 0 ? (
                <EmptyState
                  icon={Activity}
                  title="No recent activity"
                  description="Your recent transactions and activities will appear here."
                  compact
                />
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.desc}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <div
                        className={`font-semibold ${
                          typeof activity.amount === "string" &&
                          activity.amount.startsWith("-")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {activity.amount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-gray-900 text-lg font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 h-11"
              >
                <Link
                  href="/dashboard/payment-link"
                  className="flex items-center justify-center"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Create Payment Link
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-200 hover:bg-blue-50 h-11"
              >
                <Link
                  href="/dashboard/transactions"
                  className="flex items-center justify-center"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  View Transactions
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-200 hover:bg-blue-50 h-11"
              >
                <Link
                  href="/dashboard/balance"
                  className="flex items-center justify-center"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Manage Balance
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentPaymentLinks />
          <RevenueAnalytics />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
