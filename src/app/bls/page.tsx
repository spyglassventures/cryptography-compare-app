/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */


"use client";
import React, { useState } from "react";
import { bls12_381 } from "@noble/curves/bls12-381";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function BlsPlayground() {
    const [privateKey, setPrivateKey] = useState<string>("");
    const [publicKey, setPublicKey] = useState<string>("");
    const [message, setMessage] = useState<string>("I ❤️ BLS");
    const [signature, setSignature] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const generateKeyPair = async () => {
        const priv = bls12_381.utils.randomPrivateKey();
        const pub = await bls12_381.getPublicKey(priv);
        setPrivateKey(Buffer.from(priv).toString("hex"));
        setPublicKey(Buffer.from(pub).toString("hex"));
        setSignature("");
        setIsValid(null);
    };

    const signMessage = async () => {
        if (!privateKey) return;
        const priv = Buffer.from(privateKey, "hex");
        const sig = await bls12_381.sign(utf8ToBytes(message), priv);
        setSignature(Buffer.from(sig).toString("hex"));
        setIsValid(null);
    };

    const verifySignature = async () => {
        if (!publicKey || !signature) return;
        const pub = Buffer.from(publicKey, "hex");
        const sig = Buffer.from(signature, "hex");
        const valid = await bls12_381.verify(sig, utf8ToBytes(message), pub);
        setIsValid(valid);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">BLS Signatures Playground</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <b>BLS (Boneh–Lynn–Shacham)</b> signatures are short, secure digital signatures that support aggregation.
                Used in Ethereum 2.0 (validators), threshold cryptography, and zero-knowledge systems.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">How BLS Signatures Work</h2>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Generate a key pair (private and public).</li>
                    <li>Sign a message using the private key.</li>
                    <li>Anyone can verify the signature with the message and public key.</li>
                </ol>
                <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-2 text-blue-900 dark:text-blue-200 rounded">
                    Ethereum uses BLS to allow validators to sign blocks with lightweight, aggregatable proofs.
                </div>
            </section>

            <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
                <div className="mb-4">
                    <button
                        onClick={generateKeyPair}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Generate Key Pair
                    </button>
                </div>
                <div className="mb-2">
                    <label className="block font-semibold">Private Key:</label>
                    <input
                        type="text"
                        value={privateKey}
                        readOnly
                        className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-semibold">Public Key:</label>
                    <input
                        type="text"
                        value={publicKey}
                        readOnly
                        className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-semibold">Message:</label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs"
                    />
                </div>
                <div className="flex gap-2 mb-2">
                    <button
                        onClick={signMessage}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Sign Message
                    </button>
                    <button
                        onClick={verifySignature}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Verify Signature
                    </button>
                </div>
                {signature && (
                    <div className="mb-2">
                        <label className="block font-semibold">Signature:</label>
                        <input
                            type="text"
                            value={signature}
                            readOnly
                            className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs"
                        />
                    </div>
                )}
                {isValid !== null && (
                    <div className={`mt-2 font-bold ${isValid ? "text-green-600" : "text-red-600"}`}>
                        {isValid ? "✅ Signature is valid!" : "❌ Signature is invalid."}
                    </div>
                )}
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Why BLS is special</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-2">
                    <li>Signature aggregation: many signatures → 1 compact proof</li>
                    <li>Used in proof-of-stake consensus (Ethereum Beacon Chain)</li>
                    <li>Great for zero-knowledge and multi-party cryptography</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-1">Explore More</h3>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-300">
                    <li>
                        <a href="https://eth2book.info" target="_blank" rel="noopener noreferrer" className="underline">
                            BLS in Ethereum 2.0 (eth2book)
                        </a>
                    </li>
                    <li>
                        <a href="https://hackmd.io/@benjaminion/bls12-381" target="_blank" rel="noopener noreferrer" className="underline">
                            BLS12-381 Curve Overview
                        </a>
                    </li>
                    <li>
                        <a href="https://crypto.stanford.edu/~dabo/pubs/papers/BLSmultisig.html" target="_blank" rel="noopener noreferrer" className="underline">
                            The original BLS paper
                        </a>
                    </li>
                </ul>
            </section>

            <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
        </div>
    );
}
