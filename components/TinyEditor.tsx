'use client'

import React, {useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import katex from 'katex';
import 'katex/dist/katex.min.css'


interface TinyEditorProps {
    initialValue?: string;
    onEditorChange: (content: string) => void;
}

export default function TinyEditorRef({initialValue, onEditorChange}: TinyEditorProps) {
    const editorRef = useRef<any>(null);

    const onUserPaste = (e: any) => {
        const clipboardData = e.clipboardData;
        const pastedData = clipboardData.getData('Text');

        // Patterns for inline and display math
        const bracketDisplayPattern = /\\\[[^\]]+\\\]/g;

        let newContent = pastedData;

        newContent = newContent.replace(bracketDisplayPattern, match => {
            const equation = match.slice(2, -2).trim();

            console.log('equation::', equation)
            return `<div class="katex">${katex.renderToString(equation, {
                throwOnError: false,
                displayMode: true,
            })}</div>`;
        });

        console.log('FINAL:: ', newContent);

        editorRef.current?.execCommand('mceInsertContent', false, newContent);
        e.preventDefault();
    };


    const onChangeContent = (content: any) => {
        onEditorChange(editorRef.current?.getContent() || '')
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
                    plugins: [
                        'lists', 'image', 'charmap', 'code', 'fullscreen', 'table', 'media'
                    ],
                    toolbar: 'undo redo | bold italic | alignleft aligncenter | table image ' +
                        'alignright alignjustify | bullist numlist outdent indent | removeformat',
                    content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size:14px }'
                }}
                onPaste={onUserPaste} onChange={onChangeContent}/>
        </>
    );
}