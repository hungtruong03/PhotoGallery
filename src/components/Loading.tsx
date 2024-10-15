import React from 'react';
import '../styles/Loading.css';

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">Loading...</div>
        </div>
    );
};

export default Loading;