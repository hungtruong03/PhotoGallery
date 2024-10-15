import { useNavigate } from 'react-router-dom';
import '../styles/BackButton.css';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); //Quay về trang Photo Gallery
    };

    return (
        <button onClick={handleBack} className="back-button">
            Go Back to Gallery
        </button>
    );
};

export default BackButton;