import React from 'react';
import { PhotoInfoProps } from '../interfaces/PhotoInfo';
import BackButton from './BackButton';
import '../styles/PhotoInfo.css';

const PhotoInfo: React.FC<PhotoInfoProps> = ({ title, description, author, likes }) => {
    return (
        <div className="photo-info">
            <div className="category-title">Title</div>
            <p>{title || "No Title"}</p>
            <div className="category-title">Description</div>
            <p>{description}</p>
            <div className="category-title">Author</div>
            <p>{author}</p>
            <p className="likes">&#10084; {likes}</p>
            <BackButton />
        </div>
    );
};

export default PhotoInfo;