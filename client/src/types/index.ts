export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface Poem {
    id: string;
    title: string;
    content: string;
    authorId: string;
    location: {
        latitude: number;
        longitude: number;
    };
    createdAt: Date;
}

export interface Collection {
    id: string;
    userId: string;
    poemIds: string[];
    createdAt: Date;
}