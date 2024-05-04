// components/Editor.tsx

'use client';

import dynamic from 'next/dynamic';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import type { TinyEditorRef, TinyEditorProps } from './TinyEditor';

const TinyEditor = dynamic(() => import('./TinyEditor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface EditorProps {
  initialValue?: string;
  onEditorChange?: (content: string) => void;
}

const Editor = forwardRef<TinyEditorRef, EditorProps>(({ initialValue = '', onEditorChange = () => {} }, ref) => {
  const editorRef = useRef<TinyEditorRef>(null);

  const handleEditorChange = (content: string) => {
    if (onEditorChange) {
      onEditorChange(content);
    }
  };

  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (editorRef.current) {
        return editorRef.current.getContent();
      }
      return '';
    },
  }));

  return (
    <TinyEditor ref={editorRef} initialValue={initialValue} onEditorChange={handleEditorChange} />
  );
});

Editor.displayName = 'Editor';

export default Editor;
