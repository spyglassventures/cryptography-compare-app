/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */

"use client";
import React from "react";

export default function BlockStructure() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Block Structure</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Every block in a blockchain is like a page in a ledger. It contains a list of transactions, a reference to the previous block, a timestamp, and cryptographic fingerprints (hashes) that tie everything together.
      </p>
      <h2 className="text-xl font-semibold mb-2">Why is this important?</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Blocks are chained together, making it impossible to change history without detection.</li>
        <li>Each block contains a Merkle root, linking all transactions securely.</li>
        <li>Block structure is what makes blockchain technology trustworthy and transparent.</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-4 text-blue-900 dark:text-blue-200 rounded">
        <b>Real-world example:</b> When you look up a block on a block explorer, you see its hash, previous hash, Merkle root, and all included transactions.
      </div>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <p className="text-gray-500">[Block structure visualization coming soon]</p>
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 