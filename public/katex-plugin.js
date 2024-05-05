tinymce.PluginManager.add('katex', function (editor) {
    editor.ui.registry.addButton('katex', {
        text: 'KaTeX',
        onAction: function () {
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
                    const katexHtml = window.katex.renderToString(data.katex, {
                        throwOnError: false,
                    });
                    editor.insertContent(katexHtml);
                    api.close();
                },
            });
        },
    });

    editor.ui.registry.addMenuItem('katex', {
        text: 'Insert KaTeX',
        onAction: function () {
            editor.execCommand('katex');
        },
    });
});
