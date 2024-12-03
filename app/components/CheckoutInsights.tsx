import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1500 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2200 },
  { name: "May", total: 2500 },
  { name: "Jun", total: 2800 },
];

const CheckoutInsights: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout Insights</CardTitle>
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
            <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          <p className="text-sm">
            Conversion Rate: <span className="font-medium">3.2%</span>
          </p>
          <p className="text-sm">
            Payment Success Rate: <span className="font-medium">98.5%</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutInsights;
