"use client";
import React, { useState } from "react";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function ZkProofPlayground() {
    const [secret, setSecret] = useState("");
    const [storedHash, setStoredHash] = useState<Uint8Array | null>(null);
    const [guess, setGuess] = useState("");
    const [result, setResult] = useState<null | boolean>(null);

    const storeHash = () => {
        const hash = sha256(utf8ToBytes(secret));
        setStoredHash(hash);
        setSecret("");
        setGuess("");
        setResult(null);
    };

    const proveKnowledge = () => {
        if (!storedHash) return;
        const attemptHash = sha256(utf8ToBytes(guess));
        const match = Buffer.from(attemptHash).toString("hex") === Buffer.from(storedHash).toString("hex");
        setResult(match);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Zero-Knowledge Proof Playground</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Zero-Knowledge Proofs (ZKPs) allow someone to prove they know a secret — without revealing it.
                This playground simulates that with a simple password hash comparison.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">How it works</h2>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Enter a secret and save the hash (simulates a verifier storing a commitment).</li>
                    <li>Later, prove you know the secret by submitting it again (the verifier compares hashes).</li>
                    <li>The secret is never stored or shown publicly.</li>
                </ol>
            </section>

            <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
                <div className="mb-4">
                    <label className="block font-semibold">Secret (e.g., password or number):</label>
                    <input
                        type="text"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="e.g. 12345"
                        className="w-full p-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-xs mb-2"
                    />
                    <button
                        onClick={storeHash}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Store Hashed Secret
                    </button>
                </div>

                {storedHash && (
                    <div className="mb-4">
                        <label className="block font-semibold">Prove you know the secret:</label>
                        <input
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            className="w-full p-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-xs mb-2"
                        />
                        <button
                            onClick={proveKnowledge}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Prove Knowledge
                        </button>
                    </div>
                )}

                {result !== null && (
                    <div className={`mt-2 font-bold ${result ? "text-green-600" : "text-red-600"}`}>
                        {result ? "✅ Proof accepted: You know the secret!" : "❌ Proof failed: Incorrect guess."}
                    </div>
                )}
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Why ZKPs matter in crypto</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-2">
                    <li><b>Privacy:</b> ZKPs let you prove something (like your age or balance) without revealing the actual value.</li>
                    <li><b>Efficiency:</b> Used in zkRollups to prove entire batches of transactions are valid without sending all data.</li>
                    <li><b>Security:</b> No one can learn your secret — only that you know it.</li>
                </ul>

                <div className="bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 p-4 mb-2 text-yellow-900 dark:text-yellow-200 rounded">
                    ZKPs are used in zkSync, StarkNet, Zcash, Semaphore, and more.
                </div>

                <h3 className="text-xl font-semibold mt-4 mb-1">Want to go deeper?</h3>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-300">
                    <li><a href="https://z.cash/technology/zksnarks/" target="_blank" rel="noopener noreferrer" className="underline">How zk-SNARKs work</a></li>
                    <li><a href="https://semaphore.appliedzkp.org/" target="_blank" rel="noopener noreferrer" className="underline">Semaphore (anonymous voting with ZKPs)</a></li>
                    <li><a href="https://youtu.be/UQ9s3fjj7s8" target="_blank" rel="noopener noreferrer" className="underline">ZKP Explained in 100 Seconds (video)</a></li>
                </ul>
            </section>

            <a href="/" className="text-blue-600 hover:underline">
                ← Back to Home
            </a>
        </div>
    );
}
