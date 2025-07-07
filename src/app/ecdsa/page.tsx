"use client";
import React, { useState } from "react";
import { secp256k1 } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function ECDSAPlayground() {
  // State for demo
  const [privateKey, setPrivateKey] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [message, setMessage] = useState<string>("Hello, blockchain!");
  const [signature, setSignature] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Generate key pair
  const generateKeyPair = () => {
    const priv = secp256k1.utils.randomPrivateKey();
    const pub = secp256k1.getPublicKey(priv);
    setPrivateKey(Buffer.from(priv).toString("hex"));
    setPublicKey(Buffer.from(pub).toString("hex"));
    setSignature("");
    setIsValid(null);
  };

  // Sign message
  const signMessage = () => {
    if (!privateKey) return;
    const priv = Buffer.from(privateKey, "hex");
    const msgHash = sha256(utf8ToBytes(message));
    const sig = secp256k1.sign(msgHash, priv);
    setSignature(Buffer.from(sig.toCompactRawBytes()).toString("hex"));
    setIsValid(null);
  };

  // Verify signature
  const verifySignature = () => {
    if (!publicKey || !signature) return;
    const pub = Buffer.from(publicKey, "hex");
    const sig = Buffer.from(signature, "hex");
    const msgHash = sha256(utf8ToBytes(message));
    const valid = secp256k1.verify(sig, msgHash, pub);
    setIsValid(valid);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">ECDSA Playground</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <b>ECDSA</b> (Elliptic Curve Digital Signature Algorithm) is a cryptographic algorithm used to sign messages and verify signatures. It's widely used in blockchains like Bitcoin and Ethereum.
      </p>
      <ol className="mb-6 text-gray-700 dark:text-gray-300 list-decimal list-inside space-y-2">
        <li>
          <b>Key Generation:</b> Generate a random private key and derive the public key from it.
        </li>
        <li>
          <b>Signing:</b> Sign a message with your private key to produce a digital signature.
        </li>
        <li>
          <b>Verification:</b> Anyone can verify the signature using your public key and the message.
        </li>
      </ol>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What is ECDSA?</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          ECDSA stands for <b>Elliptic Curve Digital Signature Algorithm</b>. It's a way to prove that a message (like a transaction) was really created by you, without revealing your secret key. ECDSA is used in Bitcoin, Ethereum, and many other blockchains to secure transactions.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-1">Real-World Example</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Imagine you want to send 1 Bitcoin to a friend. You create a transaction and sign it with your private key using ECDSA. The Bitcoin network can check your signature using your public key, making sure only you could have created this transaction. This prevents anyone else from spending your coins.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-2 text-blue-900 dark:text-blue-200 rounded">
          <b>In short:</b> ECDSA lets you prove ownership and authorize actions on the blockchain, without sharing your secret.
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Why is ECDSA important?</h3>
        <ul className="list-disc list-inside mb-2 text-gray-700 dark:text-gray-300">
          <li>It keeps your crypto assets safe from theft.</li>
          <li>It allows anyone to verify your signature, but only you can create it.</li>
          <li>It's efficient and secure, making it ideal for blockchains.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-1">Learn More</h3>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300">
          <li><a href="https://www.blockchain.com/learning-portal/what-is-a-digital-signature" target="_blank" rel="noopener noreferrer" className="underline">What is a digital signature?</a></li>
          <li><a href="https://bitcoin.org/en/how-it-works" target="_blank" rel="noopener noreferrer" className="underline">How Bitcoin uses ECDSA</a></li>
          <li><a href="https://www.youtube.com/watch?v=GSIDS_lvRv4" target="_blank" rel="noopener noreferrer" className="underline">Video: ECDSA explained simply</a></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How is ECDSA used in Blockchains?</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          In blockchains like Bitcoin and Ethereum, ECDSA is the backbone of security. Every time you send coins or interact with a smart contract, you use your private key to sign a transaction with ECDSA. The network uses your public key to check that the signature is valid—proving you really authorized the action.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-1">Example: Sending Bitcoin</h3>
        <ul className="list-disc list-inside mb-2 text-gray-700 dark:text-gray-300">
          <li>You create a transaction: "Send 1 BTC to Alice".</li>
          <li>You sign the transaction with your private key using ECDSA.</li>
          <li>The signature is included in the transaction and broadcast to the network.</li>
          <li>Every node checks the signature with your public key. If it matches, the transaction is accepted.</li>
        </ul>
        <div className="bg-green-50 dark:bg-green-900/40 border-l-4 border-green-400 p-4 mb-2 text-green-900 dark:text-green-200 rounded">
          <b>Without ECDSA, anyone could spend your coins! ECDSA ensures only you can authorize transactions from your wallet.</b>
        </div>
      </section>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <div className="mb-4">
          <button onClick={generateKeyPair} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate Key Pair</button>
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Private Key:</label>
          <input type="text" value={privateKey} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Public Key:</label>
          <input type="text" value={publicKey} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Message:</label>
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
        </div>
        <div className="flex gap-2 mb-2">
          <button onClick={signMessage} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sign Message</button>
          <button onClick={verifySignature} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Verify Signature</button>
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Signature:</label>
          <input type="text" value={signature} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
        </div>
        {isValid !== null && (
          <div className={`mt-2 font-bold ${isValid ? "text-green-600" : "text-red-600"}`}>
            {isValid ? "Signature is valid!" : "Signature is invalid."}
          </div>
        )}
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 