import React from "react";

export const ContactForm = ({
    name,
    setName,
    course,
    setCourse,
    email={email} ,
    setEmail={setEmail},
    handleSubmit,
}) => {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh', 
    };

    const formStyle = {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        backgroundColor: '#03a8d8',
        border: '1px solid #03a8d8',
        borderRadius: '5px',
        width: '100%',
        color: 'white',
        height: '50px',
        fontSize: '20px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <h2>Add Details:</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
                <label htmlFor='name' style={labelStyle}>Name:</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    style={inputStyle}
                    required
                />
                <label htmlFor='course' style={labelStyle}>Course:</label>
                <input
                    type='text'
                    id='course'
                    value={course}
                    placeholder="Write course name here"
                    onChange={(e) => { setCourse(e.target.value) }}
                    style={inputStyle}
                    required
                />
                <label htmlFor='email' style={labelStyle}>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    style={inputStyle}
                    required
                />
                <button
                    style={buttonStyle}
                    type="submit"
                    onChange={handleSubmit}
                >
                    Generate PDF
                </button>
            </form>
        </div>
    );
};