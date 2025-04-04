export interface Item {
    id: number;
    category_id: number;
    rooms_id: number;
    title: string;
    description: string;
    created_at?: string;
    image: string | null;
}

export interface ProductWithoutId {
    category_id: number;
    rooms_id: number;
    title: string;
    description: string;
    created_at?: string;
    image: string | null;
}

export interface Place {
    id: number;
    title: string;
    description: string | null;
}

export interface PlaceWithoutId {
    title: string;
    description: string | null;
}

export interface Category {
    id: number;
    title: string;
    description: string | null;
}

export interface DeleteId {
    id: number;
}