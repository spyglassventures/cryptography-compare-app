"use client";
import React, { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function FrostPlayground() {
    const [privateKey, setPrivateKey] = useState<string>("");
    const [publicKey, setPublicKey] = useState<string>("");
    const [shares, setShares] = useState<string[]>([]);
    const [message, setMessage] = useState("Hello from FROST!");
    const [signature, setSignature] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const generateKeyAndShares = async () => {
        const priv = ed25519.utils.randomPrivateKey();
        const pub = ed25519.getPublicKey(priv);
        const privHex = Buffer.from(priv).toString("hex");
        const pubHex = Buffer.from(pub).toString("hex");

        // Simulated secret sharing: just split into 3 chunks
        const hex = privHex.padEnd(64, "0");
        const shares = [hex.slice(0, 20), hex.slice(20, 44), hex.slice(44)];

        setPrivateKey(privHex);
        setPublicKey(pubHex);
        setShares(shares);
        setSignature("");
        setIsValid(null);
    };

    const simulateThresholdSign = async () => {
        if (!privateKey) return;
        const priv = Buffer.from(privateKey, "hex");
        const sig = ed25519.sign(utf8ToBytes(message), priv);
        setSignature(Buffer.from(sig).toString("hex"));
        setIsValid(null);
    };

    const verifySignature = () => {
        if (!signature || !publicKey) return;
        const pub = Buffer.from(publicKey, "hex");
        const sig = Buffer.from(signature, "hex");
        const valid = ed25519.verify(sig, utf8ToBytes(message), pub);
        setIsValid(valid);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">FROST (EdDSA) Playground</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <b>FROST</b> is a threshold signature protocol that allows a group to jointly create a valid EdDSA/Schnorr signature — without ever revealing the private key.
                This simulation shows how shares are distributed and then used to "sign" together.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">How it works (simplified)</h2>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Generate a private key and split it into multiple shares.</li>
                    <li>Participants each hold a share. No one knows the full key.</li>
                    <li>At signing time, participants collaborate to produce a valid signature.</li>
                </ol>
            </section>

            <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
                <div className="mb-4">
                    <button
                        onClick={generateKeyAndShares}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Generate Key & Shares
                    </button>
                </div>

                <div className="mb-2">
                    <label className="block font-semibold">Private Key (full):</label>
                    <input type="text" value={privateKey} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
                </div>
                <div className="mb-2">
                    <label className="block font-semibold">Public Key:</label>
                    <input type="text" value={publicKey} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
                </div>
                <div className="mb-2">
                    <label className="block font-semibold">Simulated Shares:</label>
                    {shares.map((s, i) => (
                        <input key={i} type="text" value={s} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs mb-1" />
                    ))}
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
                    <button onClick={simulateThresholdSign} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Simulate Threshold Signing
                    </button>
                    <button onClick={verifySignature} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                        Verify Signature
                    </button>
                </div>

                {signature && (
                    <div className="mb-2">
                        <label className="block font-semibold">Signature:</label>
                        <input type="text" value={signature} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
                    </div>
                )}

                {isValid !== null && (
                    <div className={`mt-2 font-bold ${isValid ? "text-green-600" : "text-red-600"}`}>
                        {isValid ? "✅ Signature is valid!" : "❌ Signature is invalid."}
                    </div>
                )}
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Why FROST matters</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-2">
                    <li>Used in modern threshold wallets and MPC signing systems</li>
                    <li>Efficient: only 1–2 rounds of communication</li>
                    <li>Secure against rogue key attacks and faulty signers</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-1">Explore More</h3>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-300">
                    <li><a href="https://frost.dev/" target="_blank" rel="noopener noreferrer" className="underline">FROST.dev: Official site</a></li>
                    <li><a href="https://eprint.iacr.org/2020/852" target="_blank" rel="noopener noreferrer" className="underline">FROST Paper (IACR)</a></li>
                    <li><a href="https://blog.chain.link/threshold-signatures-explained/" target="_blank" rel="noopener noreferrer" className="underline">Threshold Signatures Explained (Chainlink)</a></li>
                </ul>
            </section>

            <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
        </div>
    );
}
