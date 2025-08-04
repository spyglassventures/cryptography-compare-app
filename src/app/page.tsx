// app/page.tsx
'use client';

import GlitchLogo from "../components/GlitchLogo";
import TileLink from "../components/TileLink";
import MatrixBackground from "../components/MatrixBackground";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-black text-white relative overflow-hidden">
      {/* Logo oben rechts */}
      {/* <img
        src="/logo/1.png"
        alt="Logo"
        className="absolute top-4 left-4 w-22 h-22 z-20"
      /> */}

      {/* Matrix-like Blockchain Background */}
      <MatrixBackground />

      {/* Main Content */}
      <div className="z-10 w-full">
        <header className="text-center mb-12">
          <GlitchLogo text="0xCurve.org" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-mono mt-2">
            A playground for modern cryptography in blockchain — interactive, structured, and open.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-green-400 mb-6 text-center">Signature Schemes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TileLink href="/ecdsa" label="ECDSA Playground" />
            <TileLink href="/schnorr" label="Schnorr Signatures Demo" />
            <TileLink href="/bls" label="BLS Signatures" />
            <TileLink href="/frost" label="FROST (EdDSA)" />
            <TileLink href="/speedcomparison" label="Signature Speed Comparison" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-green-400 mb-6 text-center">Threshold / MPC</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TileLink href="/mpc-tss" label="MPC & TSS Playground" />
            <TileLink href="/mpc" label="MPC Simulator" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-green-400 mb-6 text-center">Encryption & Trees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TileLink href="/paillier" label="Paillier Homomorphic Encryption" />
            <TileLink href="/merkle-tree-playground" label="Merkle Tree Playground" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-green-400 mb-6 text-center">Concepts & Learning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TileLink href="/transaction-hashing" label="Transaction Hashing" />
            <TileLink href="/merkle-trees" label="Merkle Trees" />
            <TileLink href="/hash-functions" label="Hash Functions" />
            <TileLink href="/key-pairs" label="Key Pairs" />
            <TileLink href="/zkps" label="ZK Proofs" />
            <TileLink href="/zkproofs" label="Zero-Knowledge Proofs" />
            <TileLink href="/block-structure" label="Block Structure" />
            <TileLink href="/history" label="Crypto History" />
            <TileLink href="/comparison" label="When to Use What" />
          </div>
        </section>

        <footer className="mt-16 text-xs text-gray-500 text-center">
          <p className="mb-2">Built for hackers, educators, and tinkerers. Open-source. No trackers.</p>

        </footer>
      </div>
    </div>
  );
}