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