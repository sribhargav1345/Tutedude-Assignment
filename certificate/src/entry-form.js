import React, { useState } from "react";
import axios from 'axios';

import { ContactForm } from "./components/ContactForm";

export const Form = () => {
    
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [pdfLink, setPdfLink] = useState(null); 

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/certificates', {
                name,
                course,
                email,
            });
        
            const certificateLink = response.data.certificateLink;
            setPdfLink(certificateLink);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    if (pdfLink) {
        window.location.href = pdfLink;
    }
    
    return (
        <div style={containerStyle}>
            <section>
                <ContactForm 
                    name={name} 
                    setName={setName} 
                    course={course} 
                    setCourse={setCourse}
                    email={email} 
                    setEmail={setEmail} 
                    handleSubmit={handleSubmit} 
                />
                {pdfLink && <a href={pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>}
            </section>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
};

export default Form;
