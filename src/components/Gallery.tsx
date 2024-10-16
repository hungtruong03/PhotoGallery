import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Gallery.css';
import { Photo } from '../interfaces/Photo';
import PhotoItem from './PhotoItem';

const Gallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(1); //Trang hiện tại
    const [loading, setLoading] = useState(false); //Kiểm tra có đang tải hình mới hay không
    const [hasMore, setHasMore] = useState(true); //Kiểm tra còn hình mới hay không
    const navigate = useNavigate();

    const fetchPhotos = async (pageNumber: number) => {
        setLoading(true); //Đánh dấu đang load hình
        try {
            //api key = import.meta.env.VITE_KEY

            //Sử dụng json server
            // const response = await axios.get(`http://localhost:3000/img`);
            // const allPhotos = response.data;

            // const limit = 10;
            // const startIndex = (pageNumber - 1) * limit;
            // const endIndex = startIndex + limit;

            //Nếu fetch vượt quá số hình tối đa thì api sẽ trả về những hình cuối cùng, phải lọc những hình trùng ra
            // const newPhotos = allPhotos.slice(startIndex, endIndex).filter((newPhoto: Photo) =>
            //     !photos.some((existingPhoto: Photo) => existingPhoto.id === newPhoto.id)
            // );

            const response = await axios.get(`https://api.unsplash.com/photos/?client_id=${import.meta.env.VITE_KEY}&page=${pageNumber}&per_page=10`);

            //Nếu fetch vượt quá số hình tối đa thì api sẽ trả về những hình cuối cùng (hình như vậy), phải lọc những hình trùng ra
            const newPhotos = response.data.filter((newPhoto: Photo) =>
                !photos.some((existingPhoto: Photo) => existingPhoto.id === newPhoto.id)
            );

            if (newPhotos.length === 0) {
                setHasMore(false);
            } else {
                setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]); //Vẫn còn hình mới
            }
        } catch (error) {
            console.log('Error fetching photos:', error);
            setHasMore(false); //Fetch lỗi thì có thể là đã hết 50 call/1 tiếng (hoặc api key sai, nhưng trường hợp này khó xảy ra)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos(page);
    }, [page]);

    const handleScroll = () => {
        //Kiểm tra người dùng đã kéo đến cuối trang chưa, nếu đã kéo đến cuối trang rồi và chưa load thêm thì mới tăng số trang
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5 && !loading && hasMore) {
            setPage(prevPage => prevPage + 1); //Tăng số trang lên
        }
    };
    
    //Bắt sự kiện scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    //Nhấn vào photo item thì sẽ navigate người dùng đến trang detail
    const handleClick = (id: string) => {
        navigate(`/detail?id=${id}`);
    };

    return (
        <>
            <div className="title-gallery">
                Photo Gallery
            </div>
            <div className="photo-gallery">
                {photos.map((photo) => (
                    <PhotoItem
                        key={photo.id}
                        id={photo.id}
                        imageUrl={photo.urls.small}
                        altDescription={photo.alt_description}
                        username={photo.user.username}
                        avatarUrl={photo.user.profile_image.large}
                        likes={photo.likes}
                        onClick={handleClick}
                    />
                ))}
            </div>
            <div>
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : (
                    !hasMore && <div className="end-message">No more images to load.</div>
                )}
            </div>
        </>
    );
};

export default Gallery;