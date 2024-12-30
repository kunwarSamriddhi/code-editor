import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');

    useEffect(() => {
        const fetchCode = async () => {
            try {
                const response = await axios.get(`http://localhost:5100/api/code/${language}`, {
                    headers: {
                        'auth-token': 'your_jwt_token',
                    },
                });
                setCode(response.data.code);
            }
            catch (error) {
                console.log('Error fetching code:', error);
            }
        }
        fetchCode();
    }, [language]);

    const saveCode = async () => {
        try {
            await axios.post('http://localhost:5100/api/code/', {
                code,
                language,
            }, {
                headers: {
                    'auth-token': 'your_jwt_token_here',
                },
            });
            alert('Code saved successfully');
        } catch (error) {
            console.error('Error saving code:', error);
        }
    };

    return (
        <div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={saveCode}>Save Code</button>
        </div>
    )
}

export default CodeEditor
