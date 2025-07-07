"use client";
import React, { useState } from "react";
import { generateRandomKeys } from "paillier-bigint";

export default function PaillierDemo() {
  const [publicKey, setPublicKey] = useState<any>(null);
  const [privateKey, setPrivateKey] = useState<any>(null);
  const [plaintext1, setPlaintext1] = useState<string>("5");
  const [plaintext2, setPlaintext2] = useState<string>("7");
  const [ciphertext1, setCiphertext1] = useState<string>("");
  const [ciphertext2, setCiphertext2] = useState<string>("");
  const [sumCiphertext, setSumCiphertext] = useState<string>("");
  const [decryptedSum, setDecryptedSum] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Generate Paillier key pair
  const generateKeys = async () => {
    setLoading(true);
    const { publicKey, privateKey } = await generateRandomKeys(2048);
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
    setCiphertext1("");
    setCiphertext2("");
    setSumCiphertext("");
    setDecryptedSum("");
    setLoading(false);
  };

  // Encrypt two numbers
  const encryptNumbers = () => {
    if (!publicKey) return;
    const c1 = publicKey.encrypt(BigInt(plaintext1));
    const c2 = publicKey.encrypt(BigInt(plaintext2));
    setCiphertext1(c1.toString());
    setCiphertext2(c2.toString());
    setSumCiphertext("");
    setDecryptedSum("");
  };

  // Homomorphic addition and decryption
  const addAndDecrypt = () => {
    if (!publicKey || !privateKey || !ciphertext1 || !ciphertext2) return;
    const c1 = BigInt(ciphertext1);
    const c2 = BigInt(ciphertext2);
    // Homomorphic addition: c_sum = c1 * c2 mod n^2
    const cSum = publicKey.addition(c1, c2);
    setSumCiphertext(cSum.toString());
    // Decrypt
    const decrypted = privateKey.decrypt(cSum);
    setDecryptedSum(decrypted.toString());
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Paillier Homomorphic Encryption</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <b>Paillier cryptosystem</b> is a public-key encryption scheme with a special property: you can add encrypted numbers without decrypting them (homomorphic addition). This is useful for privacy-preserving computations in blockchain and beyond.
      </p>
      <ol className="mb-6 text-gray-700 dark:text-gray-300 list-decimal list-inside space-y-2">
        <li>
          <b>Key Generation:</b> Generate a public and private key pair.
        </li>
        <li>
          <b>Encryption:</b> Encrypt two numbers using the public key.
        </li>
        <li>
          <b>Homomorphic Addition:</b> Add the ciphertexts to get an encrypted sum.
        </li>
        <li>
          <b>Decryption:</b> Decrypt the sum using the private key.
        </li>
      </ol>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <div className="mb-4">
          <button onClick={generateKeys} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>{loading ? "Generating..." : "Generate Key Pair"}</button>
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Public Key (n):</label>
          <input type="text" value={publicKey ? publicKey.n.toString() : ""} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
        </div>
        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <label className="block font-semibold">Plaintext 1:</label>
            <input type="number" value={plaintext1} onChange={e => setPlaintext1(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">Plaintext 2:</label>
            <input type="number" value={plaintext2} onChange={e => setPlaintext2(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
          </div>
        </div>
        <div className="mb-2">
          <button onClick={encryptNumbers} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={!publicKey}>Encrypt Numbers</button>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <label className="block font-semibold">Ciphertext 1:</label>
            <input type="text" value={ciphertext1} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">Ciphertext 2:</label>
            <input type="text" value={ciphertext2} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
          </div>
        </div>
        <div className="mb-2">
          <button onClick={addAndDecrypt} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" disabled={!ciphertext1 || !ciphertext2}>Add & Decrypt</button>
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Encrypted Sum (Ciphertext):</label>
          <input type="text" value={sumCiphertext} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Decrypted Sum (Plaintext):</label>
          <input type="text" value={decryptedSum} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
        </div>
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 