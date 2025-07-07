import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 bg-gray-50 dark:bg-gray-900">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Cryptography in Blockchain</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore and learn about the cryptographic techniques powering blockchain technology. Try interactive demos for ECDSA, Schnorr signatures, and Paillier homomorphic encryption.
        </p>
      </header>
      <nav className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/ecdsa" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
          <span className="font-semibold">ECDSA Playground</span>
          <span className="block text-sm text-gray-500">Learn and experiment with Elliptic Curve Digital Signature Algorithm</span>
        </Link>
        <Link href="/schnorr" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
          <span className="font-semibold">Schnorr Signatures Demo</span>
          <span className="block text-sm text-gray-500">Understand and try Schnorr signature generation and verification</span>
        </Link>
        <Link href="/paillier" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
          <span className="font-semibold">Paillier Homomorphic Encryption</span>
          <span className="block text-sm text-gray-500">Explore homomorphic encryption with the Paillier cryptosystem</span>
        </Link>
      </nav>
      <section className="mt-12 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Related Concepts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/transaction-hashing" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
            <span className="font-semibold">Transaction Hashing</span>
            <span className="block text-sm text-gray-500">How transactions are uniquely identified and secured</span>
          </Link>
          <Link href="/merkle-trees" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
            <span className="font-semibold">Merkle Trees</span>
            <span className="block text-sm text-gray-500">Efficiently verifying large sets of data in blocks</span>
          </Link>
          <Link href="/hash-functions" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
            <span className="font-semibold">Hash Functions</span>
            <span className="block text-sm text-gray-500">The cryptographic glue of blockchain</span>
          </Link>
          <Link href="/key-pairs" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
            <span className="font-semibold">Public/Private Key Pairs</span>
            <span className="block text-sm text-gray-500">How wallets and digital signatures work</span>
          </Link>
          <Link href="/zkps" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
            <span className="font-semibold">Zero-Knowledge Proofs</span>
            <span className="block text-sm text-gray-500">Proving things without revealing secrets</span>
          </Link>
          <Link href="/block-structure" className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700">
            <span className="font-semibold">Block Structure</span>
            <span className="block text-sm text-gray-500">How all the cryptography fits together in a block</span>
          </Link>
        </div>
      </section>
      <footer className="mt-12 text-gray-400 text-xs">Hobby project for learning cryptography in blockchain. Inspired by <a href="https://kjur.github.io/jsrsasign/sample/sample-ecdsa.html" className="underline" target="_blank" rel="noopener noreferrer">jsrsasign ECDSA demo</a>.</footer>
    </div>
  );
}
