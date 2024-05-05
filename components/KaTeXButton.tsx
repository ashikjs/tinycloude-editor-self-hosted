// components/KaTeXButton.tsx

import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import 'antd/dist/reset.css'; // Reset CSS
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KaTeXButtonProps {
  editor: any;
}

export const KaTeXButton: React.FC<KaTeXButtonProps> = ({ editor }) => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    const katexHtml = katex.renderToString(input, {
      throwOnError: false,
    });
    editor.insertContent(katexHtml);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        KaTeX
      </Button>
      <Modal title="Insert KaTeX" open={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item label="KaTeX">
            <Input.TextArea rows={4} value={input} onChange={(e) => setInput(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
