// pages/index.tsx

'use client';

import { useRef, useState } from 'react';
import Editor, { TinyEditorRef } from '../components/Editor';

export default function Home() {
  const editorRef = useRef<TinyEditorRef>(null);
  const [editorContent, setEditorContent] = useState('');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TinyMCE with Next.js</h1>
      <Editor ref={editorRef} initialValue="<p>Hello, TinyMCE!</p>" onEditorChange={(content) => setEditorContent(content)} />
      <h2 className="text-xl font-bold mt-4">Editor Content:</h2>
      <div className="border p-4" dangerouslySetInnerHTML={{ __html: editorContent }} />
    </div>
  );
}
