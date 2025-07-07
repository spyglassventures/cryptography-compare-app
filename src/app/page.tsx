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
      <footer className="mt-12 text-gray-400 text-xs">Hobby project for learning cryptography in blockchain. Inspired by <a href="https://kjur.github.io/jsrsasign/sample/sample-ecdsa.html" className="underline" target="_blank" rel="noopener noreferrer">jsrsasign ECDSA demo</a>.</footer>
    </div>
  );
}
