"use client";
import React, { useState } from "react";
import { secp256k1 } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function MpcTssPlayground() {
    const [privateKey, setPrivateKey] = useState<string>("");
    const [shares, setShares] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("Hello, TSS World!");
    const [signature, setSignature] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const generateKeyAndShares = () => {
        const priv = secp256k1.utils.randomPrivateKey();
        const privHex = Buffer.from(priv).toString("hex");
        setPrivateKey(privHex);

        // Simulate share splitting (not real Shamir Secret Sharing)
        const chunkSize = Math.ceil(privHex.length / 3);
        const parts = [
            privHex.slice(0, chunkSize),
            privHex.slice(chunkSize, chunkSize * 2),
            privHex.slice(chunkSize * 2)
        ];
        setShares(parts);
        setSignature("");
        setIsValid(null);
    };

    const signMessage = () => {
        if (!privateKey) return;
        const priv = Buffer.from(privateKey, "hex");
        const msgHash = sha256(utf8ToBytes(message));
        const sig = secp256k1.sign(msgHash, priv);
        setSignature(Buffer.from(sig.toCompactRawBytes()).toString("hex"));
        setIsValid(null);
    };

    const verifySignature = () => {
        if (!privateKey || !signature) return;
        const pub = secp256k1.getPublicKey(Buffer.from(privateKey, "hex"));
        const msgHash = sha256(utf8ToBytes(message));
        const valid = secp256k1.verify(Buffer.from(signature, "hex"), msgHash, pub);
        setIsValid(valid);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">MPC & TSS Playground</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <b>MPC (Multi-Party Computation)</b> and <b>TSS (Threshold Signature Schemes)</b> allow multiple parties to collaboratively sign a message <i>without revealing the full private key</i>.
                This page simulates that concept by splitting a key into parts.
            </p>

            <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><b>Key Generation:</b> Generate a private key and simulate splitting it into 3 shares.</li>
                <li><b>Signing:</b> Use the full key (simulated recombination) to sign a message.</li>
                <li><b>Verification:</b> Confirm the signature is valid using the public key.</li>
            </ol>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">What are MPC and TSS?</h2>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                    <b>MPC</b> enables multiple parties to compute something together without revealing their own inputs. <b>TSS</b> is a form of MPC focused on digital signatures.
                </p>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                    In TSS, a private key is split into multiple shares. Any threshold number of them (e.g. 2 of 3) can sign a message together — without reconstructing the full key.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-2 text-blue-900 dark:text-blue-200 rounded">
                    <b>Used in wallets:</b> Fireblocks, Coinbase Custody, ZenGo, and Web3Auth all use MPC/TSS to protect user funds.
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Why is TSS important?</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-2">
                    <li>No single device ever holds the full private key.</li>
                    <li>It prevents key theft and supports secure multi-user wallets.</li>
                    <li>Threshold signing is faster and more UX-friendly than classic multisig.</li>
                </ul>
            </section>

            <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
                <div className="mb-4">
                    <button onClick={generateKeyAndShares} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate Private Key & Shares</button>
                </div>
                {privateKey && (
                    <>
                        <div className="mb-2">
                            <label className="block font-semibold">Private Key:</label>
                            <input type="text" value={privateKey} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold">Shares:</label>
                            {shares.map((s, i) => (
                                <input key={i} type="text" value={s} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs mb-1" />
                            ))}
                        </div>
                    </>
                )}
                <div className="mb-2">
                    <label className="block font-semibold">Message:</label>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
                </div>
                <div className="flex gap-2 mb-2">
                    <button onClick={signMessage} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sign Message</button>
                    <button onClick={verifySignature} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Verify Signature</button>
                </div>
                {signature && (
                    <div className="mb-2">
                        <label className="block font-semibold">Signature:</label>
                        <input type="text" value={signature} readOnly className="w-full bg-gray-100 dark:bg-gray-900 p-2 rounded font-mono text-xs" />
                    </div>
                )}
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
