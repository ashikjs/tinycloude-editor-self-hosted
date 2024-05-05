// pages/index.tsx

'use client';

import {useState} from 'react';
import TinyEditorRef from "@/components/TinyEditor";

export default function Home() {
    const [editorContent, setEditorContent] = useState('<p>sdjk gduigfvd58gv4df 5g6df</p>');

    const onChangeEditor = (content: string) => {
        setEditorContent(content);
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">TinyMCE with Next.js</h1>
            <TinyEditorRef initialValue={'<p>sdjk gduigfvd58gv4df 5g6df</p>'}
                           onEditorChange={onChangeEditor}
            />
            <h2 className="text-xl font-bold mt-4">Editor Content:</h2>
            <div className="border p-4" dangerouslySetInnerHTML={{__html: editorContent}}></div>
        </div>

    );
}
