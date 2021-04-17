import React, { useRef } from 'react';
import Editor, { EditorProps, Monaco } from '@monaco-editor/react';
import loader from '@monaco-editor/loader';
const path = window.require('path');

export default function Creator() {
    const monacoRef = useRef(null);

    function handleEditorWillMount(monaco: Monaco) {
        // here is the monaco instance
        // do something before editor is mounted
        function ensureFirstBackSlash(str: any) {
            return str.length > 0 && str.charAt(0) !== '/' ? '/' + str : str;
        }

        function uriFromPath(_path: any) {
            const pathName = path.resolve(_path).replace(/\\/g, '/');
            return encodeURI('file://' + ensureFirstBackSlash(pathName));
        }

        loader.config({
            paths: {
                vs: uriFromPath(
                    path.join(
                        __dirname,
                        '../../../node_modules/monaco-editor/min/vs',
                    ),
                ),
            },
        });
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    }

    function handleEditorDidMount(editor: EditorProps, monaco: Monaco) {
        // here is another way to get monaco instance
        // you can also store it in `useRef` for further usage
        monacoRef.current = editor;
    }

    return (
        <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
        />
    );
}
