import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const PaymentManagement: React.FC = () => {
  const paymentMethods = [
    { id: 1, type: "Credit Card", last4: "4242", expiry: "12/24" },
    { id: 2, type: "PayPal", email: "user@example.com" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {paymentMethods.map((method) => (
            <li key={method.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{method.type}</p>
                <p className="text-sm text-gray-500">
                  {method.last4 ? `**** ${method.last4}` : method.email}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4" variant="outline">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentManagement;
