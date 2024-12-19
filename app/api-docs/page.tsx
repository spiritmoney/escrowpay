"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const endpoints = {
  transactions: [
    {
      name: "Create Transaction",
      method: "POST",
      path: "/transactions",
      description: "Initialize a new escrow transaction for secure payment",
    },
    {
      name: "Get Transaction",
      method: "GET",
      path: "/transactions/:id",
      description: "Retrieve details and status of a specific transaction",
    },
    {
      name: "Get All Transactions",
      method: "GET",
      path: "/transactions",
      description:
        "List all transactions with optional filtering and pagination",
    },
  ],
  wallets: [
    {
      name: "Get Wallet Balance",
      method: "GET",
      path: "/wallets/balance",
      description: "Get current wallet balance across supported currencies",
    },
    {
      name: "Create Wallet",
      method: "POST",
      path: "/wallets",
      description: "Create a new wallet for handling transactions",
    },
  ],
};

const codeExamples = [
  {
    name: "JavaScript",
    code: `
const API_URL = 'https://espeespay-backend.onrender.com';

// Create an Paylinc transaction
const createTransaction = async (token) => {
  const response = await fetch(\`\${API_URL}/transactions\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: 1000,
      currency: 'NGN',
      description: 'Product purchase',
      type: 'escrow',
      recipient: 'seller@example.com'
    })
  });
  return response.json();
};

// Get wallet balance
const getBalance = async (token) => {
  const response = await fetch(\`\${API_URL}/wallets/balance\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  return response.json();
};
`,
  },
  {
    name: "Python",
    code: `
import requests

API_URL = 'https://espeespay-backend.onrender.com'

def create_transaction(token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        f'{API_URL}/transactions',
        headers=headers,
        json={
            'amount': 1000,
            'currency': 'NGN',
            'description': 'Product purchase',
            'type': 'escrow',
            'recipient': 'seller@example.com'
        }
    )
    return response.json()

def get_wallet_balance(token):
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(
        f'{API_URL}/wallets/balance',
        headers=headers
    )
    return response.json()
`,
  },
];

const ApiDocsPage: React.FC = () => {
  const router = useRouter();

  // Add authentication check
  useEffect(() => {
    // Replace this with your actual auth check logic
    const isAuthenticated = localStorage.getItem("token"); // or your auth method

    if (!isAuthenticated) {
      router.push("/signin"); // or your sign-in route
    }
  }, [router]);

  // Prevent flash of content by returning null while checking auth
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Replace with your actual auth check
      const isAuthenticated = localStorage.getItem("token");
      if (!isAuthenticated) {
        router.push("/auth/signin");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow">
        <div className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              API Documentation
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Integrate Paylinc's secure payment and trading features into your
              application.
            </p>

            {/* Authentication Section */}
            <section className="mt-12">
              <h3 className="text-2xl font-bold text-white">Authentication</h3>
              <p className="mt-2 text-gray-400">
                Secure your API requests with your API key in the Authorization
                header:
              </p>
              <pre className="mt-4 bg-gray-900 p-4 rounded-md text-blue-500">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
            </section>

            {/* Code Examples */}
            <section className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                Integration Examples
              </h3>
              <Tabs defaultValue={codeExamples[0].name.toLowerCase()}>
                <TabsList className="bg-gray-800">
                  {codeExamples.map((lang) => (
                    <TabsTrigger
                      key={lang.name}
                      value={lang.name.toLowerCase()}
                      className="text-gray-400 data-[state=active]:text-blue-500"
                    >
                      {lang.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {codeExamples.map((lang) => (
                  <TabsContent key={lang.name} value={lang.name.toLowerCase()}>
                    <pre className="bg-gray-900 text-gray-300 p-4 rounded-md overflow-x-auto">
                      <code>{lang.code}</code>
                    </pre>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* API Endpoints */}
            <section className="mt-12 space-y-8">
              <h3 className="text-2xl font-bold text-white">API Endpoints</h3>

              {Object.entries(endpoints).map(([category, apis]) => (
                <div key={category} className="mt-8">
                  <h4 className="text-xl font-semibold text-white capitalize mb-4">
                    {category.replace("-", " ")}
                  </h4>
                  <div className="space-y-4">
                    {apis.map((api) => (
                      <div
                        key={`${api.method}-${api.path}`}
                        className="bg-gray-900 p-4 rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500 font-mono">
                            {api.method}
                          </span>
                          <span className="text-gray-300 font-mono">
                            {api.path}
                          </span>
                        </div>
                        <p className="text-gray-400 mt-2 text-sm">
                          {api.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Full Documentation Link */}
            <div className="mt-12">
              <Button
                disabled
                size="lg"
                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              >
                View Full API Reference
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocsPage;
