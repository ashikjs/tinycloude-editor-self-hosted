'use client'

import React, {useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';


interface TinyEditorProps {
    initialValue?: string;
    onEditorChange: (content: string) => void;
}
export default function TinyEditorRef({initialValue, onEditorChange}: TinyEditorProps) {
    const editorRef = useRef<any>(null);

    const onChangeContent = (c: any) => {
        onEditorChange(editorRef.current?.getContent() || '');
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