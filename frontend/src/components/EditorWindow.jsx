import React from 'react';
import Editor from '@monaco-editor/react';
import { useEffect } from 'react';

const EditorWindow = (props) => {
    return (
        <div className='editor-window'>
            <h4>{props.title}</h4>
            <Editor
                height="300px"
                defaultLanguage={props.language}
                value={props.code}
                onChange={(value) => { props.setCode(value) }}
            />
        </div>
    );
}

export default EditorWindow;


































/* 
<div className="editor-window">
            <h3>{title}</h3>
            <Editor
                height="200px"
                defaultLanguage={language}
                value={code}
                onChange={(value) => setCode(value)}
            />
</div> */