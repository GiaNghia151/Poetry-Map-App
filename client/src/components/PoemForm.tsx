import React, { useState } from 'react';

const PoemForm: React.FC<{
    onSubmit: (poem: { title: string; content: string; location: string; imageUrl?: string }) => void,
    initialData?: { title: string; content: string; location: string; imageUrl?: string }
}> = ({ onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

    React.useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setLocation(initialData.location);
            setImageUrl(initialData.imageUrl || '');
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, content, location, imageUrl });
        if (!initialData) {
            setTitle('');
            setContent('');
            setLocation('');
            setImageUrl('');
        }
    };

    const inputStyle: any = {
        width: '100%',
        padding: '14px',
        background: '#222',
        border: '1px solid #333',
        borderRadius: '4px',
        color: '#eee',
        marginBottom: '20px',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.2s ease'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#666',
        marginBottom: '8px',
        fontFamily: 'monospace'
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label style={labelStyle} htmlFor="title">Title of the Story</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. The Echo of East London"
                    required
                />
            </div>
            <div>
                <label style={labelStyle} htmlFor="location">City / Location</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. Shoreditch, UK"
                    required
                />
            </div>
            <div>
                <label style={labelStyle} htmlFor="imageUrl">Photo URL (Optional)</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={inputStyle}
                    placeholder="Link to mural photo..."
                />
            </div>
            <div>
                <label style={labelStyle} htmlFor="content">The Poem / Story</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={Object.assign({}, inputStyle, { height: '150px', resize: 'none' })}
                    placeholder="Write the words that live here..."
                    required
                />
            </div>
            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '16px',
                    background: 'white',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
            >
                {initialData ? 'Update Poem' : 'Submit to Map'}
            </button>
        </form>
    );
};

export default PoemForm;