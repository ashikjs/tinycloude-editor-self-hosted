'use client'

import React, {useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import katex from 'katex';
import 'katex/dist/katex.min.css'


interface TinyEditorProps {
    initialValue?: string;
    onEditorChange: (content: string) => void;
}
export default function TinyEditorWithKatexRef({initialValue, onEditorChange}: TinyEditorProps) {
    const editorRef = useRef<any>(null);
    const lastContentRef = useRef<string>('');

    const checkLatexAndConvertToKatex = (content: string) => {
        const latexPattern: RegExp = /\\\[[^\]]+\\\]/g;

        if (latexPattern.test(content)) {
            content = content.replace(latexPattern, match => {
                const equation = match.slice(2, -2).trim();
                const katexHtml = katex.renderToString(equation, {
                    throwOnError: false,
                    displayMode: true,
                });

                return katexHtml;
            });

            if (content !== lastContentRef.current) {
                lastContentRef.current = content;
                editorRef.current?.setContent(content, { format: 'raw' });
            }
        }
    }

    const onChangeContent = (c: any) => {
        const content = editorRef.current?.getContent() || '';
        if (content !== lastContentRef.current) {
            onEditorChange(content);
            checkLatexAndConvertToKatex(content);
        }
    }

    return (
        <>
            <Editor
                id="tiny-mce-editor"
                licenseKey='gpl'
                tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                onInit={(evt, editor: any) => editorRef.current = editor}
                initialValue={initialValue || ''}
                init={{
                    height: 350,
                    menubar: false,
                    plugins: ['lists', 'image', 'charmap', 'code', 'fullscreen', 'table', 'media'],
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | code | table image | removeformat',
                    content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size:14px }'
                }}
                onChange={onChangeContent}/>
        </>
    );
}