// components/TinyEditor.tsx

'use client';

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
import 'tinymce/plugins/image';
import 'tinymce/plugins/code';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface TinyEditorProps {
  initialValue: string;
  onEditorChange: (content: string) => void;
}

export interface TinyEditorRef {
  getContent: () => string;
}

const TinyEditor = forwardRef<TinyEditorRef, TinyEditorProps>(({ initialValue, onEditorChange }, ref) => {
  const editorRef = useRef<tinymce.Editor | null>(null);

  useEffect(() => {
    tinymce.init({
      selector: '#tiny-mce-editor',
      plugins: 'link table image code',
      toolbar: 'undo redo | formatselect | bold italic | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image code katexButton',
      setup: (editor) => {
        editorRef.current = editor;

        editor.ui.registry.addButton('katexButton', {
          icon: 'formula',
          tooltip: 'Insert KaTeX',
          onAction: () => {
            editor.execCommand('katex');
          }
        });

        editor.addCommand('katex', () => {
          editor.windowManager.open({
            title: 'Insert KaTeX',
            body: {
              type: 'panel',
              items: [
                {
                  type: 'textarea',
                  name: 'katex',
                  label: 'KaTeX',
                },
              ],
            },
            buttons: [
              {
                text: 'Close',
                type: 'cancel',
              },
              {
                text: 'Insert',
                type: 'submit',
                primary: true,
              },
            ],
            onSubmit: function (api) {
              const data = api.getData();
              const katexHtml = katex.renderToString(data.katex, {
                throwOnError: false,
              });
              editor.insertContent(katexHtml);
              api.close();
            },
          });
        });

        editor.on('change', () => {
          onEditorChange(editor.getContent());
        });
      },
      base_url: '/tinymce',
      suffix: '.min',
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.remove();
      }
    };
  }, [onEditorChange]);

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current ? editorRef.current.getContent() : ''
  }), []);

  return (
    <textarea
      id="tiny-mce-editor"
      defaultValue={initialValue}
    />
  );
});

TinyEditor.displayName = 'TinyEditor';

export default TinyEditor;
