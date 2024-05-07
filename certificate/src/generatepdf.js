import React, { useEffect } from "react";
import axios from 'axios';

const GeneratePDF = ({ name, course, email }) => {
    useEffect(() => {
        generatePDF();
    }, []);

    const generatePDF = async () => {
        try {
            const response = await axios.post('/api/certificates', {
                name,
                course,
                email,
            }, {
                responseType: 'blob' 
            });
        
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
        
            window.open(pdfUrl);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return null;
};

export default GeneratePDF;
