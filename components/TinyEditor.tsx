'use client'

import React, {useEffect, useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';

interface TinyEditorProps {
    initialValue?: string;
    onEditorChange: (content: string) => void;
}

export default function TinyEditorRef({ initialValue, onEditorChange }: TinyEditorProps) {
    const editorRef = useRef<any>(null);

    const onUserPast = (e: any) => {
        console.log('onUserPast:: ', e)
    }

    const onChangeContent = (content: any) => {
        onEditorChange(editorRef.current?.getContent() || '')
        console.log('onChangeContent:: ', editorRef.current?.getContent())
    }

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current?.getContent());
        }
    };

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
                        'lists', 'image', 'charmap', 'code', 'fullscreen', 'table', 'media '
                    ],
                    toolbar: 'undo redo | bold italic | alignleft aligncenter | table image ' +
                        'alignright alignjustify | bullist numlist outdent indent | removeformat',
                    content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size:14px }'
                }}
                onPaste={onUserPast} onChange={onChangeContent}/>
            <p>----------------------</p>
            <p>Change it:: </p>
            <button onClick={log}>Log editor content</button>
        </>
    );
}