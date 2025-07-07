"use client";
import React from "react";

export default function KeyPairs() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Public/Private Key Pairs</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Every blockchain wallet is really just a <b>key pair</b>: a secret private key and a public key you can share. Your private key lets you sign transactions, and your public key lets others verify them.
      </p>
      <h2 className="text-xl font-semibold mb-2">Why is this important?</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Key pairs are the foundation of digital signatures and wallets.</li>
        <li>Only you know your private key, so only you can spend your coins.</li>
        <li>Your public key (or its hash) is your blockchain address.</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-4 text-blue-900 dark:text-blue-200 rounded">
        <b>Real-world example:</b> If you lose your private key, you lose access to your crypto—no one can help you recover it!
      </div>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <p className="text-gray-500">[Key pair visualization coming soon]</p>
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 