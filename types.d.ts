export interface Product {
    id: string;
    category_id: number;
    place_id: number;
    title: string;
    description: string;
    created_at?: string;
    image: string | null;
}

export interface Place {
    id: string;
    title: string;
    description: string;
}

export interface Category {
    id: string;
    title: string;
    description: string;
}