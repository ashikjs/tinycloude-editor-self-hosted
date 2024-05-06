import React, { useEffect, useRef } from 'react';
import renderMathInElement from 'katex/contrib/auto-render';
import 'katex/dist/katex.min.css';

interface SafeHtmlRendererProps {
    html: string;
}

export default function SafeHtmlRenderer({ html }: SafeHtmlRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            renderMathInElement(containerRef.current);
        }
    }, [html]);

    return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
