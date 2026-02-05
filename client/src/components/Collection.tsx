import React from 'react';

const Collection: React.FC = () => {
    // Sample data for user's favorite poems
    const favoritePoems = [
        { id: 1, title: "The Road Not Taken", author: "Robert Frost" },
        { id: 2, title: "Still I Rise", author: "Maya Angelou" },
        { id: 3, title: "If—", author: "Rudyard Kipling" },
    ];

    return (
        <div>
            <h1>Your Favorite Poems</h1>
            <ul>
                {favoritePoems.map(poem => (
                    <li key={poem.id}>
                        <h2>{poem.title}</h2>
                        <p>by {poem.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Collection;