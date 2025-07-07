"use client";
import React, { useState } from "react";
import { schnorr } from "@noble/curves/secp256k1";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function SchnorrDemo() {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [message, setMessage] = useState<string>("Schnorr is cool!");
  const [signature, setSignature] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Generate key pair
  const generateKeyPair = () => {
    const priv = schnorr.utils.randomPrivateKey();
    const pub = schnorr.getPublicKey(priv);
    setPrivateKey(Buffer.from(priv).toString("hex"));
    setPublicKey(Buffer.from(pub).toString("hex"));
    setSignature("");
    setIsValid(null);
  };

  // Sign message
  const signMessage = async () => {
    if (!privateKey) return;
    const priv = Buffer.from(privateKey, "hex");
    const msg = utf8ToBytes(message);
    const sig = await schnorr.sign(msg, priv);
    setSignature(Buffer.from(sig).toString("hex"));
    setIsValid(null);
  };

  // Verify signature
  const verifySignature = async () => {
    if (!publicKey || !signature) return;
    const pub = Buffer.from(publicKey, "hex");
    const sig = Buffer.from(signature, "hex");
    const msg = utf8ToBytes(message);
    const valid = await schnorr.verify(sig, msg, pub);
    setIsValid(valid);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Schnorr Signatures Demo</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <b>Schnorr signatures</b> are a modern alternative to ECDSA, offering simplicity, provable security, and support for signature aggregation. They are used in Bitcoin's Taproot upgrade and are gaining popularity in blockchain systems.
      </p>
      <ol className="mb-6 text-gray-700 dark:text-gray-300 list-decimal list-inside space-y-2">
        <li>
          <b>Key Generation:</b> Generate a random private key and derive the public key from it.
        </li>
        <li>
          <b>Signing:</b> Sign a message with your private key to produce a Schnorr signature.
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