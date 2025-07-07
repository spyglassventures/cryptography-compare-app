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
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What are Schnorr Signatures?</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Schnorr signatures are a modern way to sign messages securely. They are simple, fast, and have some unique features that make them popular in new blockchain technologies, like Bitcoin's Taproot upgrade.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-1">Real-World Example</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Suppose you want to prove you authorized a transaction on a blockchain. With Schnorr, you sign the transaction with your private key. The network can check your signature with your public key, ensuring only you could have created it. Schnorr also allows combining multiple signatures into one, making transactions more private and efficient (used in Bitcoin Taproot).
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-2 text-blue-900 dark:text-blue-200 rounded">
          <b>In short:</b> Schnorr signatures let you prove you authorized something, and can even combine signatures for privacy and efficiency.
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Why are Schnorr Signatures important?</h3>
        <ul className="list-disc list-inside mb-2 text-gray-700 dark:text-gray-300">
          <li>They are simple and secure, reducing the risk of bugs.</li>
          <li>They allow signature aggregation, saving space and improving privacy.</li>
          <li>They are now used in Bitcoin and other modern blockchains.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-1">Learn More</h3>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300">
          <li><a href="https://bitcoinops.org/en/topics/schnorr-signatures/" target="_blank" rel="noopener noreferrer" className="underline">Schnorr Signatures in Bitcoin</a></li>
          <li><a href="https://river.com/learn/terms/s/schnorr-signature/" target="_blank" rel="noopener noreferrer" className="underline">Schnorr Signature explained</a></li>
          <li><a href="https://www.youtube.com/watch?v=5jQp9pM1a6c" target="_blank" rel="noopener noreferrer" className="underline">Video: Schnorr Signatures for Beginners</a></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How are Schnorr Signatures used in Blockchains?</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Schnorr signatures are used in modern blockchains to make transactions more private, efficient, and secure. Bitcoin added Schnorr signatures with the Taproot upgrade in 2021. With Schnorr, multiple signatures can be combined into one, making complex transactions look simple and saving space on the blockchain.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-1">Example: Multi-signature Wallet</h3>
        <ul className="list-disc list-inside mb-2 text-gray-700 dark:text-gray-300">
          <li>Suppose 3 people must approve a transaction (a multi-signature wallet).</li>
          <li>With Schnorr, all 3 can combine their signatures into a single signature.</li>
          <li>The blockchain only sees one signature, so it's more private and efficient.</li>
          <li>This reduces transaction fees and hides the complexity from outside observers.</li>
        </ul>
        <div className="bg-green-50 dark:bg-green-900/40 border-l-4 border-green-400 p-4 mb-2 text-green-900 dark:text-green-200 rounded">
          <b>Schnorr signatures help blockchains scale and protect user privacy, especially for advanced use cases like multi-signature wallets and smart contracts.</b>
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