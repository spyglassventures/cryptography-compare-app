/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */



"use client";
import React from "react";

export default function ZKPs() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Zero-Knowledge Proofs (ZKPs)</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <b>Zero-Knowledge Proofs</b> let you prove you know something (like a password or secret) without revealing what it is. ZKPs are used in privacy blockchains to keep data secret while still proving it’s valid.
      </p>
      <h2 className="text-xl font-semibold mb-2">Why is this important?</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>ZKPs enable private transactions and confidential smart contracts.</li>
        <li>They’re used in blockchains like Zcash, zkSync, and more.</li>
        <li>You can prove you’re allowed to do something without revealing your identity or data.</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-4 text-blue-900 dark:text-blue-200 rounded">
        <b>Real-world example:</b> Zcash lets you send coins without anyone seeing the amount or addresses involved—thanks to ZKPs!
      </div>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <p className="text-gray-500">[Zero-knowledge proof demo coming soon]</p>
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 