/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */


"use client";
import Link from "next/link";

export default function HistoryPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">A Brief History of Cryptography in Blockchain</h1>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
                This timeline walks through the cryptographic milestones that made modern blockchains possible —
                from early digital signatures to privacy-preserving zero-knowledge systems.
            </p>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">1970s–1980s: The Foundations</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><b>1976:</b> Diffie–Hellman key exchange — the first public-key system.</li>
                    <li><b>1978:</b> RSA — the first practical digital signature system (not used in blockchain).</li>
                    <li><b>1985:</b> ElGamal signatures — the basis for DSA and later ECDSA.</li>
                </ul>
                <div className="mt-2 text-sm text-gray-500">These inventions made secure communication without shared secrets possible.</div>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">1990s: Hash Functions & Merkle Trees</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><b>1992:</b> Merkle Trees proposed for efficient data verification.</li>
                    <li><b>1995:</b> SHA-1 becomes a widely used hash function.</li>
                </ul>
                <p className="mt-2 text-sm text-gray-500">
                    Hashing and Merkle structures became critical for securely linking data together — perfect for a blockchain.
                </p>
                <Link href="/merkle-tree" className="text-blue-600 underline text-sm mt-2 inline-block">Try the Merkle Tree Explorer →</Link>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">2008–2009: Bitcoin and ECDSA</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><b>2008:</b> Satoshi Nakamoto publishes the Bitcoin whitepaper.</li>
                    <li><b>2009:</b> The first block is mined using ECDSA signatures and SHA-256 hashing.</li>
                </ul>
                <p className="mt-2 text-sm text-gray-500">
                    Bitcoin uses ECDSA on the secp256k1 curve to sign transactions. This is still standard for many coins.
                </p>
                <Link href="/ecdsa" className="text-blue-600 underline text-sm mt-2 inline-block">Try the ECDSA Playground →</Link>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">2015: Ethereum and Smart Contracts</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Ethereum reuses ECDSA and Keccak-256 for its core cryptography.</li>
                    <li>Smart contracts enable new use cases for cryptography: commitments, proofs, identity.</li>
                </ul>
                <p className="mt-2 text-sm text-gray-500">
                    Ethereum expands the cryptographic surface dramatically — and sparks the ZK revolution.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">2017–2020: The Zero-Knowledge Era</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><b>Zcash:</b> Introduces zk-SNARKs for private transactions.</li>
                    <li><b>StarkWare / zkSync:</b> Scale Ethereum with zero-knowledge rollups.</li>
                    <li><b>zk-SNARK, zk-STARK, Bulletproofs, Halo 2:</b> Different proving systems emerge.</li>
                </ul>
                <Link href="/zk-proof" className="text-blue-600 underline text-sm mt-2 inline-block">Try the ZK Proof Playground →</Link>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">2020–Today: Aggregation, MPC & Threshold Signatures</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><b>BLS Signatures:</b> Used in Ethereum 2.0 for validator aggregation.</li>
                    <li><b>FROST:</b> Fast threshold signing with EdDSA/Schnorr (1–2 rounds).</li>
                    <li><b>MPC Wallets:</b> Fireblocks, ZenGo, and others use threshold cryptography in production.</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Link href="/bls" className="text-blue-600 underline text-sm">Try the BLS Playground →</Link>
                    <Link href="/frost" className="text-blue-600 underline text-sm">Try the FROST Playground →</Link>
                    <Link href="/mpc-tss" className="text-blue-600 underline text-sm">Try MPC & TSS →</Link>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-bold mb-4">What’s Next?</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Next-generation cryptography is being integrated into wallets, rollups, and chains. Keep an eye on:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>ERC-4337 session keys</li>
                    <li>FROST for multisig wallets</li>
                    <li>zkVMs and recursive proofs</li>
                </ul>
            </section>

            <div className="mt-8">
                <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
            </div>
        </div>
    );
}
