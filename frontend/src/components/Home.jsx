import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Page from './Page'
import { useState, useRef } from 'react'
import CodeEditor from './CodeEditor'
import axios from 'axios'

const Home = (props) => {
  const borderColorClass = props.theme === 'dark' ? 'border-light' : 'border-dark';
  const [html, setHtml] = useState("<h1>Hello World!</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState("console.log('Hello from JS');");

  const outputRef = useRef(null); // Reference for the output container

  const handleRunCode = () => {
    // Create an iframe
    const frame = document.createElement('iframe');
    frame.style.width = '100%'; // Set the width of the iframe
    frame.style.height = '300px'; // Set the height of the iframe

    // Append the iframe to the output container first
    if (outputRef.current) {
      outputRef.current.innerHTML = ''; // Clear existing output
      outputRef.current.appendChild(frame); // Append the iframe to the container
    }

    // Access the iframe's document
    const frameDoc = frame.contentDocument || frame.contentWindow.document;

    // Write HTML, CSS, and JS to the iframe
    frameDoc.open();
    frameDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Output</title>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>
                try {
                    ${js}
                } catch (error) {
                    console.error('Error in your JavaScript code:', error);
                    document.body.innerHTML += '<p style="color:red;">Error: ' + error.message + '</p>';
                }
            </script>
        </body>
        </html>
    `);
    frameDoc.close();
  };

  const handleSaveCode = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
      const response = await axios.post('http://localhost:5100/api/code/save-code', {
        html,
        css,
        js
      }, {
        headers: {
          'auth-token': token // Include the token in the request headers
        }
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error saving code:', error);
    }
  };

  return (
    <div>
      <Navbar border={borderColorClass}
        handleRunCode={handleRunCode}
        outputRef={outputRef}
        text={props.text}
        theme={props.theme}
        html={html}
        js={js}
        css={css}
        setHtml={setHtml}
        setJs={setJs}
        setCss={setCss}
        toggleMode={props.toggleMode}
        handleSaveCode={handleSaveCode} />

      <Sidebar border={borderColorClass}
        handleRunCode={handleRunCode}
        outputRef={outputRef}
        html={html}
        js={js}
        css={css}
        setHtml={setHtml}
        setJs={setJs}
        setCss={setCss}
        theme={props.theme}
        onLogout={props.onLogout}
        authenticate={props.authenticate}
        userName={props.userName} />

    </div>
  )
}

export default Home
