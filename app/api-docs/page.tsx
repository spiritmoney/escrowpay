import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const languages = [
  {
    name: "JavaScript",
    code: `
const escrow = require('escrow-node');
const client = new escrow.Client('YOUR_API_KEY');

const transaction = await client.createTransaction({
  amount: 100,
  currency: 'ESPEE',
  description: 'Test transaction'
});

console.log(transaction);
`,
  },
  {
    name: "Python",
    code: `
import escrow

client = escrow.Client('YOUR_API_KEY')

transaction = client.create_transaction(
  amount=100,
  currency='ESPEE',
  description='Test transaction'
)

print(transaction)
`,
  },
  {
    name: "Ruby",
    code: `
require 'escrow'

client = Escrow::Client.new('YOUR_API_KEY')

transaction = client.create_transaction(
  amount: 100,
  currency: 'ESPEES',
  description: 'Test transaction'
)

puts transaction
`,
  },
];

const ApiDocsPage: React.FC = () => {
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
              Integrate Escrow into your application with our easy-to-use API.
            </p>
            <div className="mt-12">
              <Tabs defaultValue={languages[0].name.toLowerCase()}>
                <TabsList className="bg-gray-800">
                  {languages.map((lang) => (
                    <TabsTrigger
                      key={lang.name}
                      value={lang.name.toLowerCase()}
                      className="text-gray-400 data-[state=active]:text-blue-500"
                    >
                      {lang.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {languages.map((lang) => (
                  <TabsContent key={lang.name} value={lang.name.toLowerCase()}>
                    <pre className="bg-gray-900 text-gray-300 p-4 rounded-md overflow-x-auto">
                      <code>{lang.code}</code>
                    </pre>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <div className="mt-12 space-y-8">
              <section>
                <h3 className="text-2xl font-bold text-white">
                  Authentication
                </h3>
                <p className="mt-2 text-gray-400">
                  To authenticate requests, include your API key in the
                  Authorization header:
                </p>
                <pre className="mt-4 bg-gray-900 p-4 rounded-md text-blue-500">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>
              </section>
              <section>
                <h3 className="text-2xl font-bold text-white">Endpoints</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <h4 className="text-lg font-semibold text-white">
                      Create Transaction
                    </h4>
                    <p className="text-blue-500">
                      <code>POST /v1/transactions</code>
                    </p>
                  </li>
                  <li>
                    <h4 className="text-lg font-semibold text-white">
                      Get Transaction
                    </h4>
                    <p className="text-blue-500">
                      <code>GET /v1/transactions/:id</code>
                    </p>
                  </li>
                  <li>
                    <h4 className="text-lg font-semibold text-white">
                      List Transactions
                    </h4>
                    <p className="text-blue-500">
                      <code>GET /v1/transactions</code>
                    </p>
                  </li>
                </ul>
              </section>
            </div>
            <div className="mt-12">
              <Link href="https://escro.readme.io/reference/">
                <Button
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                >
                  View Full API Reference
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocsPage;
