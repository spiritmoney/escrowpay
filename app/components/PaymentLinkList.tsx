import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";

const mockPaymentLinks = [
  {
    id: 1,
    name: "Premium Product",
    amount: 99.99,
    currency: "USD",
    type: "product",
    status: "active",
    url: "https://espeepay.com/pay/1",
  },
  {
    id: 2,
    name: "Consulting Service",
    amount: 150.0,
    currency: "EUR",
    type: "service",
    status: "active",
    url: "https://espeepay.com/pay/2",
  },
  {
    id: 3,
    name: "E-book Download",
    amount: 9.99,
    currency: "GBP",
    type: "digital",
    status: "inactive",
    url: "https://espeepay.com/pay/3",
  },
  {
    id: 4,
    name: "ESPEE Token Sale",
    amount: 100.0,
    currency: "ESPEE",
    type: "crypto",
    status: "active",
    url: "https://espeepay.com/pay/4",
  },
];

const PaymentLinksList: React.FC = () => {
  const getPaymentUrl = (id: number) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/pay/${id}`;
    }
    return `/pay/${id}`;  // Fallback for server-side rendering
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Your Payment Links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPaymentLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>{link.name}</TableCell>
                  <TableCell>
                    {link.amount} {link.currency}
                  </TableCell>
                  <TableCell>{link.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        link.status === "active" ? "default" : "secondary"
                      }
                    >
                      {link.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(getPaymentUrl(link.id))}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={getPaymentUrl(link.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentLinksList;
