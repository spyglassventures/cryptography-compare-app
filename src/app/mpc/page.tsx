/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */



"use client";
import React, { useState } from "react";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/curves/abstract/utils";
import { secp256k1 } from "@noble/curves/secp256k1";

export default function MPCPlayground() {
    const [privateKey, setPrivateKey] = useState<string>("");
    const [shares, setShares] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("Hello, MPC!");
    const [signature, setSignature] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    // Generate a private key and split it into shares (simple simulation)
    const generateShares = () => {
        const priv = secp256k1.utils.randomPrivateKey();
        const privHex = Buffer.from(priv).toString("hex");
        setPrivateKey(privHex);

        // For simplicity, split into 3 shares (this is NOT cryptographically secure!)
        const share1 = privHex.slice(0, 21);
        const share2 = privHex.slice(21, 42);
        const share3 = privHex.slice(42);
        setShares([share1, share2, share3]);

        setSignature("");
        setIsValid(null);
    };

    // Sign a message using the "reconstructed" private key
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
        if (!signature || !privateKey) return;
        const pub = secp256k1.getPublicKey(Buffer.from(privateKey, "hex"));
        const msgHash = sha256(utf8ToBytes(message));
        const valid = secp256k1.verify(Buffer.from(signature, "hex"), msgHash, pub);
        setIsValid(valid);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">MPC & TSS Playground</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <b>MPC</b> (Multi-Party Computation) and <b>TSS</b> (Threshold Signature Schemes) allow a private key to be split among multiple parties. No single party ever holds the full key, yet they can still collaboratively sign messages.
            </p>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">How Does It Work?</h2>
                <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Generate a private key and split it into multiple shares.</li>
                    <li>Use a subset of the shares to sign a message (threshold signing).</li>
                    <li>Verify the signature using the public key — just like ECDSA.</li>
                </ul>
            </section>
            <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
                <button
                    onClick={generateShares}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Generate Key Shares
                </button>
                {shares.length > 0 && (
                    <div className="mb-4">
                        <p className="font-semibold">Private Key (full):</p>
                        <input
                            type="text"
                            readOnly
                            value={privateKey}
                            className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs mb-2"
                        />
                        <p className="font-semibold">Shares:</p>
                        {shares.map((s, i) => (
                            <input
                                key={i}
                                type="text"
                                readOnly
                                value={s}
                                className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs mb-1"
                            />
                        ))}
                    </div>
                )}
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
                            readOnly
                            value={signature}
                            className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs"
                        />
                    </div>
                )}
                {isValid !== null && (
                    <div className={`mt-2 font-bold ${isValid ? "text-green-600" : "text-red-600"}`}>
                        {isValid ? "Signature is valid!" : "Signature is invalid."}
                    </div>
                )}
            </div>
            <a href="/" className="text-blue-600 hover:underline">
                ← Back to Home
            </a>
        </div>
    );
}
