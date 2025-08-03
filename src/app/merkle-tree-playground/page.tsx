"use client";
import React, { useState } from "react";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export default function MerkleTreePlayground() {
    const [leaves, setLeaves] = useState<string[]>(["a", "b", "c"]);
    const [newLeaf, setNewLeaf] = useState<string>("");
    const [proof, setProof] = useState<string[]>([]);
    const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

    const hashedLeaves = leaves.map((leaf) => keccak256(leaf));
    const tree = new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
    const root = tree.getHexRoot();

    const addLeaf = () => {
        if (!newLeaf.trim()) return;
        setLeaves([...leaves, newLeaf.trim()]);
        setNewLeaf("");
        setProof([]);
        setVerifyResult(null);
    };

    const generateProof = (target: string) => {
        const hashed = keccak256(target);
        const proofArray = tree.getProof(hashed).map((x) => x.data.toString("hex"));
        setProof(proofArray);

        const isValid = tree.verify(tree.getProof(hashed), hashed, root);
        setVerifyResult(isValid);
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Merkle Tree Playground</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                A Merkle Tree allows you to efficiently verify that a piece of data (a "leaf") is part of a larger set.
                It's used in blockchains to validate transactions without downloading the entire block.
            </p>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Add Leaf</h2>
                <input
                    value={newLeaf}
                    onChange={(e) => setNewLeaf(e.target.value)}
                    placeholder="Enter new value"
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    onClick={addLeaf}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Leaves</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800 dark:text-gray-200">
                    {leaves.map((leaf, i) => (
                        <li key={i}>
                            <code>{leaf}</code>
                            <button
                                className="ml-3 text-blue-600 hover:underline text-xs"
                                onClick={() => generateProof(leaf)}
                            >
                                Generate Proof
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Merkle Root</h2>
                <code className="block break-all bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs">{root}</code>
            </div>

            {proof.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Proof</h2>
                    <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                        {JSON.stringify(proof, null, 2)}
                    </pre>
                    <p className={`mt-2 font-bold ${verifyResult ? "text-green-600" : "text-red-600"}`}>
                        {verifyResult ? "✅ Proof is valid!" : "❌ Proof is invalid."}
                    </p>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">What is a Merkle Tree?</h2>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                    A Merkle Tree is a cryptographic data structure that summarizes and verifies large datasets efficiently.
                    Each leaf is hashed, and parent nodes are recursively hashed together, forming a tree with a single root.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Efficient: You only need a small proof to verify inclusion.</li>
                    <li>Secure: Tampering with any data changes the root.</li>
                    <li>Used in blockchains for verifying transactions.</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 p-4 mb-2 text-yellow-900 dark:text-yellow-200 rounded">
                    Bitcoin uses Merkle Trees to store transactions in each block.
                </div>
            </section>

            <a href="/" className="text-blue-600 hover:underline">
                ← Back to Home
            </a>
        </div>
    );
}
