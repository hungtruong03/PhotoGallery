export interface PhotoItemProps {
    id: string;
    imageUrl: string;
    altDescription: string;
    username: string;
    avatarUrl: string;
    likes: number;
    onClick: (id: string) => void;
}