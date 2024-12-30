import React, { useState, useRef } from 'react';
import EditorWindow from './EditorWindow';

const Page = (props) => {
    return (
        <div className={`${props.textColor} bg-${props.theme}`}>
            <div className={`editor-container ${props.textColorClass} bg-${props.theme}`}>
                <EditorWindow code={props.html} setCode={props.setHtml} theme={props.theme} language="html" title="HTML" />
                <EditorWindow code={props.css} setCode={props.setCss} theme={props.theme} language="css" title="CSS" />
                <EditorWindow code={props.js} setCode={props.setJs} theme={props.theme} language="javascript" title="JavaScript" />
            </div>

            <div className="output-container" ref={props.outputRef}>
                {/* The iframe will be appended here */}
            </div>

        </div>
    )
}

export default Page
