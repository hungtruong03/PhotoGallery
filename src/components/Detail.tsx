import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Detail.css';
import { Photo } from '../interfaces/Photo';
import BackButton from './BackButton';
import Loading from './Loading';
import PhotoInfo from './PhotoInfo';

const Detail = () => {
    const [searchParams] = useSearchParams(); //Lấy id từ search params
    const id = searchParams.get('id');
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPhoto = async () => {
            setLoading(true); //Đặt state loading
            try {
                //Sử dụng json server
                // const response = await axios.get(`http://localhost:3000/img`);

                // const index = parseInt(id || '0');
                // if (index >= 0 && index < response.data.length) {
                //     const currentPhoto = response.data[index];
                //     setPhoto(currentPhoto);
                // } else {
                //     console.log('Invalid photo index');
                // }

                //Gọi api lấy thông tin hình bằng id
                const response = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.VITE_KEY}`);

                if (response.status === 200) {
                    setPhoto(response.data);
                    setError(null); //Đặt lại state error
                }
            } catch (error: any) {
                if (error.status === 404) {
                    //Response 404
                    console.log('Error fetching photo:', error);
                    setError(`Photo not found!`);
                } else if (error.status === 403)  {
                    //Response 403
                    console.log('Error fetching photo:', error);
                    setError(`Rate limit exceeded!`);
                } else if (error.status === 401)  {
                    //Response 401
                    console.log('Error fetching photo:', error);
                    setError(`Invalid access token!`);
                } else if (error.request) {
                    //Không có response
                    console.log('No response received:', error);
                    setError('No response received from the server!');
                } else {
                    //Lỗi không biết
                    console.log('Error', error);
                    setError('An error has occurred!');
                }
            } finally {
                setLoading(false); //Đánh dấu load xong
            }
        };

        if (id) {
            fetchPhoto();
        } else {
            setError('Invalid ID'); //Không có id
        }
    }, [id]);

    if (loading) return <Loading />;

    return (
        <>
            {error ? (
                <div className="error-container">
                    <div className="error-message">
                        <p>{error}</p>
                        <BackButton />
                    </div>
                </div>
            ) : (
                <>
                    {photo ? (
                        <div className="photo-detail">
                            <img src={photo.urls.full} alt={photo.alt_description} />
                            <PhotoInfo
                                    title={photo.description}
                                    description={photo.alt_description}
                                    author={photo.user.name}
                                    likes={photo.likes}
                            />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </>
            )}
        </>
    );
};

export default Detail;