// components/GlitchLogo.tsx
'use client';

import React from 'react';


export default function GlitchLogo({ text }: { text: string }) {
    return (
        <h1 className="glitch edgy-font text-5xl md:text-6xl lg:text-7xl tracking-wide" data-text={text}>
            {text}
        </h1>
    );
}
