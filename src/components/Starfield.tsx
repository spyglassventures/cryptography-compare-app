// components/DigitalConstellation.tsx
'use client';

import { useEffect, useRef } from "react";

// Particle class to manage each "star" in the constellation
class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    maxOpacity: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3; // Slower horizontal drift
        this.vy = (Math.random() - 0.5) * 0.3; // Slower vertical drift
        this.size = Math.random() * 2 + 1; // Particle size between 1 and 3
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.5 + 0.2; // Max opacity between 0.2 and 0.7
    }

    update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Reset particle position if it goes off-screen
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // You can also reset to a random edge for a continuous flow
            // For simplicity, we'll just re-randomize its position
        }

        // Make particles fade in to appear more naturally
        if (this.opacity < this.maxOpacity) {
            this.opacity += 0.01;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

export default function DigitalConstellation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles: Particle[] = [];
        const numParticles = 100; // Adjust for more or fewer dots

        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(width, height));
        }

        const animate = () => {
            // Clear the canvas with a very subtle black background
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(width, height);
                particles[i].draw(ctx);

                // Check distance to other particles and draw lines
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = 120; // Adjust line connection distance
                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`; // Very faint lines
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Optionally, reset particles on resize for better distribution
            // particles = [];
            // for (let i = 0; i < numParticles; i++) {
            //     particles.push(new Particle(width, height));
            // }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-40"
        />
    );
}