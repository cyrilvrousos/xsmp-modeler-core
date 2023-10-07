var params = {}
for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
    params[key] = value
    console.log(key, value)
}

var config = {

    schema: {
        "type": "object",
        "properties": {
            "build.automatically": {
                "type": "boolean",
                "title": "Build automatically",
                "default": true,
                "required":true
            },
            "profile": {
                "type": "string",
                "default": "xsmp-sdk",
                "title": "Selected Profile",
                "enum": [
                    "",
                    "xsmp-sdk",
                    "esa-cdk"
                ]
            },
            "source.folders": {
                "type": "array",
                "title": "Source folders",
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            },
            "dependencies": {
                "type": "array",
                "title": "Dependencies",
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            },
            "tools": {
                "type": "array",
                "title": "Tools",
                "uniqueItems": true,
                "items": {
                    "type": "string",
                    "enum": [
                        "smp",
                        "python"
                    ]
                }
            }
        },
        "title": "Xsmp settings"
    }
}

var editor = new JSONEditor(document.querySelector('#editor_holder'), config)

editor.on('change', function () {
    const editorValue = editor.getValue();
	window.postMessage({ type: 'editorValue', value: editorValue }, '*');
})
