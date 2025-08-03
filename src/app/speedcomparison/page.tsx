"use client";
import React, { useState } from "react";
import { secp256k1 } from "@noble/curves/secp256k1";
import { ed25519 } from "@noble/curves/ed25519";
import { bls12_381 } from "@noble/curves/bls12-381";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

export default function SpeedComparison() {
    const [results, setResults] = useState<Record<string, { sign: number; verify: number }> | null>(null);
    const message = utf8ToBytes("Benchmarking cryptographic speed!");

    const benchmarkECDSA = () => {
        const priv = secp256k1.utils.randomPrivateKey();
        const pub = secp256k1.getPublicKey(priv);
        const hash = sha256(message);

        const t1 = performance.now();
        const sig = secp256k1.sign(hash, priv);
        const sigBytes = sig.toCompactRawBytes(); // <- 👈 this is a Uint8Array
        const valid = secp256k1.verify(sigBytes, hash, pub);

        const t2 = performance.now();
        const t3 = performance.now();

        const t4 = performance.now();

        setResults((r) => ({
            ...r,
            ECDSA: {
                sign: +(t2 - t1).toFixed(2),
                verify: +(t4 - t3).toFixed(2),
            },
        }));
    };

    const benchmarkEdDSA = () => {
        const priv = ed25519.utils.randomPrivateKey();
        const pub = ed25519.getPublicKey(priv);

        const t1 = performance.now();
        const sig = ed25519.sign(message, priv);
        const t2 = performance.now();
        const t3 = performance.now();
        const valid = ed25519.verify(sig, message, pub);
        const t4 = performance.now();

        setResults((r) => ({
            ...r,
            EdDSA: {
                sign: +(t2 - t1).toFixed(2),
                verify: +(t4 - t3).toFixed(2),
            },
        }));
    };

    const benchmarkBLS = async () => {
        const priv = bls12_381.utils.randomPrivateKey();
        const pub = await bls12_381.getPublicKey(priv);

        const t1 = performance.now();
        const sig = await bls12_381.sign(message, priv);
        const t2 = performance.now();
        const t3 = performance.now();
        const valid = await bls12_381.verify(sig, message, pub);
        const t4 = performance.now();

        setResults((r) => ({
            ...r,
            BLS: {
                sign: +(t2 - t1).toFixed(2),
                verify: +(t4 - t3).toFixed(2),
            },
        }));
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Signature Speed Comparison</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                This page benchmarks how fast different cryptographic signature schemes perform. The message, key, and signature sizes vary across schemes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button onClick={benchmarkECDSA} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Benchmark ECDSA
                </button>
                <button onClick={benchmarkEdDSA} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Benchmark EdDSA (ed25519)
                </button>
                <button onClick={benchmarkBLS} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                    Benchmark BLS (bls12-381)
                </button>
            </div>

            {results && (
                <table className="w-full text-sm border border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border px-4 py-2 text-left">Scheme</th>
                            <th className="border px-4 py-2 text-left">Sign Time (ms)</th>
                            <th className="border px-4 py-2 text-left">Verify Time (ms)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(results).map(([scheme, data]) => (
                            <tr key={scheme} className="bg-white dark:bg-gray-800">
                                <td className="border px-4 py-2 font-semibold">{scheme}</td>
                                <td className="border px-4 py-2">{data.sign}</td>
                                <td className="border px-4 py-2">{data.verify}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                All timings are approximate and depend on your device and browser. BLS is slower but allows aggregation.
            </div>

            <a href="/" className="mt-8 block text-blue-600 hover:underline">
                ← Back to Home
            </a>
        </div>
    );
}
