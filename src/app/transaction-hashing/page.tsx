/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */


"use client";
import React, { useState } from "react";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function TransactionHashing() {
  const [input, setInput] = useState("Send 1 BTC to Alice");
  const hash = Buffer.from(sha256(utf8ToBytes(input))).toString("hex");

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Transaction Hashing</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        In blockchains, every transaction is turned into a unique digital fingerprint called a <b>hash</b>. This hash is created using a cryptographic hash function (like SHA-256) and is used to identify, secure, and verify transactions.
      </p>
      <h2 className="text-xl font-semibold mb-2">Why is this important?</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Hashes make sure no one can secretly change a transaction.</li>
        <li>They are used as transaction IDs in Bitcoin, Ethereum, and other blockchains.</li>
        <li>Even a tiny change in the transaction creates a completely different hash.</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-4 text-blue-900 dark:text-blue-200 rounded">
        <b>Real-world example:</b> When you look up a transaction on a block explorer, you use its hash!
      </div>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <label className="block font-semibold mb-2">Transaction / Message:</label>
        <textarea
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-sm mb-4"
          rows={3}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <label className="block font-semibold mb-2">SHA-256 Hash:</label>
        <div className="w-full p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs break-all select-all">
          {hash}
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          Try changing a single character above and see how the hash changes completely!
        </div>
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 