"use client";
import Link from "next/link";

const comparisons = [
    {
        name: "ECDSA",
        use: "Signing transactions",
        goodFor: ["Widely supported (Bitcoin, Ethereum)", "Efficient and compact"],
        notFor: ["Multi-party signatures", "ZK compatibility"],
        link: "/ecdsa",
    },
    {
        name: "EdDSA",
        use: "Signing in modern systems",
        goodFor: ["Fast and deterministic", "Good for zkApps"],
        notFor: ["Aggregation (use BLS)", "Ethereum L1 (not supported)"],
        link: "/frost",
    },
    {
        name: "BLS",
        use: "Aggregated signatures (Ethereum 2.0, Dfinity)",
        goodFor: ["Signature aggregation", "Validator consensus"],
        notFor: ["Fast signing", "Browser-side performance"],
        link: "/bls",
    },
    {
        name: "FROST",
        use: "Threshold signing (2-of-3, etc.)",
        goodFor: ["Multi-sig wallets", "MPC-friendly", "Few communication rounds"],
        notFor: ["Browser-native use (still maturing)", "Legacy systems"],
        link: "/frost",
    },
    {
        name: "ZK Proofs",
        use: "Privacy and proving things without revealing data",
        goodFor: ["Identity", "Private balance proofs", "Scalability (zkRollups)"],
        notFor: ["Simple signing", "Fast verification (depending on system)"],
        link: "/zk-proof",
    },
    {
        name: "Merkle Trees",
        use: "Efficient inclusion proofs (transactions, state)",
        goodFor: ["Blockchain headers", "Light clients"],
        notFor: ["Signing", "Privacy"],
        link: "/merkle-tree",
    },
    {
        name: "Paillier Encryption",
        use: "Homomorphic operations (addition)",
        goodFor: ["Voting", "Private counters"],
        notFor: ["High-performance needs", "Multiplicative homomorphism"],
        link: "/paillier",
    },
    {
        name: "MPC / TSS",
        use: "Secure multi-party key management",
        goodFor: ["Custodial wallets", "DAOs", "HSM coordination"],
        notFor: ["On-chain use", "ZK applications"],
        link: "/mpc-tss",
    },
];

export default function ComparisonPage() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Cryptographic Tools: When to Use What</h1>
            <p className="mb-8 text-gray-700 dark:text-gray-300">
                This guide helps you pick the right cryptographic tool depending on what you're building — from blockchain apps and wallets to privacy protocols and rollups.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {comparisons.map((item) => (
                    <div
                        key={item.name}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow p-4"
                    >
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-500 mb-2">Use for: {item.use}</p>

                        <div className="mb-2">
                            <p className="text-sm font-semibold">👍 Good For:</p>
                            <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-300">
                                {item.goodFor.map((g, i) => (
                                    <li key={i}>{g}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-2">
                            <p className="text-sm font-semibold">⚠️ Not Ideal For:</p>
                            <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400">
                                {item.notFor.map((n, i) => (
                                    <li key={i}>{n}</li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            href={item.link}
                            className="inline-block mt-2 text-blue-600 dark:text-blue-300 underline text-sm"
                        >
                            Learn More →
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
            </div>
        </div>
    );
}
