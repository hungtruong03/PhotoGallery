import React from 'react';
import { PhotoFooterProps } from '../interfaces/PhotoFooterProps';
import '../styles/PhotoFooter.css';

const PhotoFooter: React.FC<PhotoFooterProps> = ({ username, avatarUrl, likes }) => {
    return (
        <div className="photo-footer">
            <div className="user-section">
                <img src={avatarUrl} alt={username} className="avatar" />
                <span className="username">{username}</span>
            </div>
            <div className="likes-section">
                <span>&#10084; {likes}</span>
            </div>
        </div>
    );
};

export default PhotoFooter;