"use client";
import React, { useState } from "react";
import { sha256 } from "@noble/hashes/sha256";
import { utf8ToBytes } from "@noble/curves/abstract/utils";

function hashLeaf(data: string) {
  return Buffer.from(sha256(utf8ToBytes(data))).toString("hex");
}

function buildMerkleTree(leaves: string[]): string[][] {
  let level = leaves.map(hashLeaf);
  const tree = [level];
  while (level.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      if (i + 1 < level.length) {
        const combined = level[i] + level[i + 1];
        nextLevel.push(hashLeaf(combined));
      } else {
        // If odd, duplicate last
        nextLevel.push(level[i]);
      }
    }
    tree.push(nextLevel);
    level = nextLevel;
  }
  return tree;
}

function getMerkleProof(tree: string[][], index: number): {sibling: string, position: 'left'|'right'}[] {
  const proof: {sibling: string, position: 'left'|'right'}[] = [];
  let idx = index;
  for (let level = 0; level < tree.length - 1; level++) {
    const currentLevel = tree[level];
    const isRight = idx % 2 === 1;
    const siblingIdx = isRight ? idx - 1 : idx + 1;
    if (siblingIdx < currentLevel.length) {
      proof.push({
        sibling: currentLevel[siblingIdx],
        position: isRight ? 'left' : 'right',
      });
    }
    idx = Math.floor(idx / 2);
  }
  return proof;
}

function verifyMerkleProof(leaf: string, proof: {sibling: string, position: 'left'|'right'}[], root: string): boolean {
  let hash = hashLeaf(leaf);
  for (const { sibling, position } of proof) {
    hash = position === 'left' ? hashLeaf(sibling + hash) : hashLeaf(hash + sibling);
  }
  return hash === root;
}

export default function MerkleTrees() {
  const [txs, setTxs] = useState(["Alice pays Bob 1 BTC", "Bob pays Carol 0.5 BTC", "Carol pays Dave 0.2 BTC", "Dave pays Eve 0.1 BTC"]);
  const [proofIndex, setProofIndex] = useState(0);
  const tree = buildMerkleTree(txs);
  const root = tree[tree.length - 1][0];
  const proof = getMerkleProof(tree, proofIndex);
  const proofValid = verifyMerkleProof(txs[proofIndex], proof, root);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Merkle Trees</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        A <b>Merkle tree</b> is a clever way to combine lots of data (like transactions) into a single fingerprint (the Merkle root). Blockchains use Merkle trees to make sure all transactions in a block are valid and haven’t been tampered with.
      </p>
      <h2 className="text-xl font-semibold mb-2">Why is this important?</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Merkle trees let you prove a transaction is in a block without downloading the whole block.</li>
        <li>They make blockchains efficient and secure.</li>
        <li>Used in Bitcoin, Ethereum, and many other blockchains.</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 p-4 mb-4 text-blue-900 dark:text-blue-200 rounded">
        <b>Real-world example:</b> Light wallets use Merkle proofs to check transactions without downloading the whole blockchain.
      </div>
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow mb-8">
        <label className="block font-semibold mb-2">Transactions:</label>
        {txs.map((tx, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs"
              value={tx}
              onChange={e => {
                const newTxs = [...txs];
                newTxs[i] = e.target.value;
                setTxs(newTxs);
              }}
            />
            <button
              className="text-red-500 hover:underline"
              onClick={() => setTxs(txs.filter((_, j) => j !== i))}
              disabled={txs.length <= 2}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="mb-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setTxs([...txs, "New transaction"])}
        >
          Add Transaction
        </button>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Merkle Root:</label>
          <div className="w-full p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs break-all select-all">
            {root}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Merkle Proof for Transaction:</label>
          <select
            className="p-2 rounded bg-gray-100 dark:bg-gray-900 font-mono text-xs mb-2"
            value={proofIndex}
            onChange={e => setProofIndex(Number(e.target.value))}
          >
            {txs.map((tx, i) => (
              <option key={i} value={i}>{i + 1}: {tx.slice(0, 20)}{tx.length > 20 ? "..." : ""}</option>
            ))}
          </select>
          <div className="mb-2">
            {proof.map((p, i) => (
              <div key={i} className="text-xs text-gray-700 dark:text-gray-300">
                {p.position === 'left' ? 'Left' : 'Right'} sibling: <span className="font-mono">{p.sibling.slice(0, 16)}...</span>
              </div>
            ))}
          </div>
          <div className={`font-bold ${proofValid ? "text-green-600" : "text-red-600"}`}>
            {proofValid ? "Proof is valid!" : "Proof is invalid."}
          </div>
        </div>
      </div>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
} 