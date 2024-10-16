import React from 'react';
import '../styles/PhotoItem.css';
import PhotoFooter from './PhotoFooter';
import { PhotoItemProps } from '../interfaces/PhotoItemProps';

const PhotoItem: React.FC<PhotoItemProps> = ({ id, imageUrl, altDescription, username, avatarUrl, likes, onClick }) => {
    return (
        <div className="photo-item" onClick={() => onClick(id)}>
            <img src={imageUrl} alt={altDescription} />
            <PhotoFooter username={username} avatarUrl={avatarUrl} likes={likes} />
        </div>
    );
};

export default PhotoItem;