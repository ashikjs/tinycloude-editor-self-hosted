'use client'

import React, {useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';

interface TinyEditorProps {
    initialValue?: string;
    onEditorChange: (content: string) => void;
}

export default function TinyEditorRef({initialValue, onEditorChange}: TinyEditorProps) {
    const editorRef = useRef<any>(null);

    const onChangeContent = (content: any) => {
        onEditorChange(editorRef.current?.getContent() || '')
        // console.log('onChangeContent:: ', editorRef.current?.getContent())
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
                    toolbar: 'undo redo | fontfamily | bold italic | alignleft aligncenter | table image ' +
                        'alignright alignjustify | bullist numlist outdent indent | removeformat',
                    font_family_formats: 'Lecture=Lecture; Sans-serif=sans-serif; Times New Roman=Times New Roman;',
                    content_style: 'body { font-size: 14px; }'
                }}
                onChange={onChangeContent}/>
        </>
    );
}