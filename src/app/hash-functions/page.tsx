/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */


"use client";
import React, { useState } from "react";
import { sha256 } from "@noble/hashes/sha256";
import { keccak_256 } from "@noble/hashes/sha3";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function HashFunctions() {
  const [input, setInput] = useState("Hello, blockchain!");
  const sha256Hash = Buffer.from(sha256(utf8ToBytes(input))).toString("hex");
  const keccakHash = Buffer.from(keccak_256(utf8ToBytes(input))).toString("hex");

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Hash Functions</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <b>Hash functions</b> are the cryptographic glue of blockchains. They turn any data into a short, unique fingerprint (the hash). Blockchains use hash functions like SHA-256 and Keccak to secure transactions, blocks, and more.
      </p>
      <h2 className="text-xl font-semibold mb-2">Why is this important?</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Hashes are used for transaction IDs, block hashes, and digital signatures.</li>
        <li>They make sure data can’t be changed without detection.</li>
        <li>Hash functions are fast, secure, and one-way (you can’t go backwards).</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-4 text-blue-900 dark:text-blue-200 rounded">
        <b>Real-world example:</b> Bitcoin mining is a race to find a block hash with enough zeros at the start!
      </div>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <label className="block font-semibold mb-2">Message:</label>
        <textarea
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-sm mb-4"
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <label className="block font-semibold mb-2">SHA-256 Hash:</label>
        <div className="w-full p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs break-all select-all mb-4">
          {sha256Hash}
        </div>
        <label className="block font-semibold mb-2">Keccak-256 Hash:</label>
        <div className="w-full p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs break-all select-all">
          {keccakHash}
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          Try different messages and see how the hashes change. Bitcoin uses SHA-256, Ethereum uses Keccak-256!
        </div>
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 