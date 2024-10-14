export interface Photo {
    id: string;
    urls: {
        small: string;
        full: string;
    };
    description: string;
    alt_description: string;
    likes: number;
    user: {
        id: string;
        name: string;
    };
}