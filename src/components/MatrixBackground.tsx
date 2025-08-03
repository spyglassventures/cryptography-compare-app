'use client';

import { useEffect, useRef } from "react";

// ✅ Move outside the component
const keywordAnimations = [
    "reorg!", "0x", "bls()", "yield↑", "🔐", "⛓️",
    "block_hash", "Finalized", "Ξ0x", "proof_of_stake",
    "keccak256()", "slot_0x01", "difficulty++", "ecdsa_sign()", "chain_id:1",
    "calldata[]", "modexp()", "sload()", "SSZ_hashTreeRoot()", "opcode_0x3b",
    "bls12_381", "sync_committee", "rewind()", "fork_choice()", "tx_index",
    "RLP_encode()", "verkle_proof", "eth_call", "bitfield<<", "bytes32",
    "rekt()", "FOMO_loop()", "underpriced_op()", "rage_quit()", "uint256_max",
    "gas_guzzler", "if (dao) { fork(); }", "🍯_pot", "unchecked++", "YOLO_tx",
    "exit_scam()", "nonce_desync", "🧠→🪙", "magic_number", "fork_it!",
    "infura_down()", "dust_attack", "rpc_404", "audit_me", "stack_too_deep"
];

// ✅ Define glitch type
type Glitch = {
    text: string;
    x: number;
    y: number;
    opacity: number;
    size: number;
    lifetime: number;
    color: string;
};

export default function GlitchyCipher() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glitchBuffer = useRef<Glitch[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);

            if (Math.random() < 0.02) {
                const newGlitch: Glitch = {
                    text: keywordAnimations[Math.floor(Math.random() * keywordAnimations.length)],
                    x: Math.random() * width,
                    y: Math.random() * height,
                    opacity: 1,
                    size: Math.floor(Math.random() * 8) + 18,
                    lifetime: 150,
                    color:
                        Math.random() > 0.7
                            ? 'rgba(255, 105, 180, 0.8)'
                            : Math.random() > 0.5
                                ? 'rgba(0, 255, 255, 0.8)'
                                : 'rgba(255, 255, 255, 0.8)',
                };
                glitchBuffer.current.push(newGlitch);
            }

            glitchBuffer.current = glitchBuffer.current.filter((g) => g.lifetime > 0);

            glitchBuffer.current.forEach((glitch) => {
                ctx.fillStyle = glitch.color;
                ctx.font = `bold ${glitch.size}px monospace`;
                ctx.fillText(glitch.text, glitch.x, glitch.y);

                glitch.opacity -= 0.02;
                glitch.lifetime--;

                if (Math.random() > 0.4) {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
                    ctx.fillText(glitch.text, glitch.x + (Math.random() - 0.5) * 8, glitch.y + (Math.random() - 0.5) * 8);
                }
            });

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            glitchBuffer.current = [];
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20"
        />
    );
}
