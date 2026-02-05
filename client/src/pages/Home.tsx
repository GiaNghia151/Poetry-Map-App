import React, { useState } from 'react';
import Map from '../components/Map';
import PoemForm from '../components/PoemForm';
import ErrorBoundary from '../components/ErrorBoundary';

const Home: React.FC = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [selectedLoc, setSelectedLoc] = useState<{ lat: number; lng: number } | null>(null);
    const [editingPoem, setEditingPoem] = useState<any>(null);

    const handleMapClick = function (lat: number, lng: number) {
        setEditingPoem(null);
        setSelectedLoc({ lat: lat, lng: lng });
        setDrawerOpen(true);
    };

    const handleEditPoem = function (poem: any) {
        setEditingPoem(poem);
        setSelectedLoc({ lat: poem.location.coordinates[1], lng: poem.location.coordinates[0] });
        setDrawerOpen(true);
    };

    const handleFormSubmit = function (poem: any) {
        var payload = Object.assign({}, poem, selectedLoc);
        var url = '/api/poems';
        var method = 'POST';

        if (editingPoem) {
            url = '/api/poems/' + editingPoem._id;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(function (res) {
                if (!res.ok) {
                    return res.json().then(function (errData) {
                        var msg = errData.message || 'Error';
                        var detail = errData.error || 'Check server logs';
                        throw new Error(msg + ': ' + detail);
                    });
                }
                return res.json();
            })
            .then(function (data) {
                console.log('Poem saved:', data);
                setDrawerOpen(false);
                setSelectedLoc(null);
                setEditingPoem(null);
                window.location.reload();
            })
            .catch(function (err) {
                alert('Error: ' + err.message);
            });
    };

    return (
        <ErrorBoundary>
            <div className="home-container" style={{ position: 'relative', height: '100vh', width: '100vw', background: '#111', overflow: 'hidden' }}>

                {/* Immersive Map Background */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <Map onMapClick={handleMapClick} onEditPoem={handleEditPoem} />
                </div>

                {/* Overlaid Branding */}
                <div className="overlay-ui" style={{ top: '40px', left: '40px' }}>
                    <h1 className="mono" style={{ fontSize: '32px', fontWeight: 300, textTransform: 'uppercase', color: 'white' }}>
                        Poetry Map
                    </h1>
                    <p className="mono" style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                        Visualising the murals and stories of our world.
                    </p>
                </div>

                {/* Navigation / Actions Overlay */}
                <div className="overlay-ui" style={{ top: '40px', right: '40px', display: 'flex', gap: '20px' }}>
                    <button
                        onClick={function () {
                            if (isDrawerOpen) {
                                setDrawerOpen(false);
                                setEditingPoem(null);
                            } else {
                                setDrawerOpen(true);
                            }
                        }}
                        style={{
                            background: 'white', color: 'black', border: 'none',
                            padding: '12px 24px', borderRadius: '50px',
                            fontWeight: 'bold', letterSpacing: '0.05em',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                        }}
                    >
                        {isDrawerOpen ? 'CLOSE' : 'SUBMIT A STORY'}
                    </button>
                </div>

                {/* Info Footer */}
                <div className="overlay-ui" style={{ bottom: '40px', left: '40px' }}>
                    <p className="mono" style={{ fontSize: '10px', color: '#555' }}>
                        © 2026 POETRY MAP / INSPIRED BY A BLANK WALL
                    </p>
                </div>

                {/* Slide-out Drawer Overlay */}
                {isDrawerOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, right: 0, height: '100vh',
                            width: '450px', background: '#1a1a1a', zIndex: 2000,
                            boxShadow: '-10px 0 50px rgba(0,0,0,0.5)',
                            padding: '60px 40px', overflowY: 'auto',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <h2 className="mono" style={{ marginBottom: '10px', fontSize: '24px' }}>
                            {editingPoem ? 'Edit Mural Story' : 'Submit Mural Story'}
                        </h2>
                        {selectedLoc && (
                            <p className="mono" style={{ fontSize: '10px', color: '#0f0', marginBottom: '10px' }}>
                                LOCATION PINNED: {selectedLoc.lat.toFixed(4)}, {selectedLoc.lng.toFixed(4)}
                            </p>
                        )}
                        <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>
                            {editingPoem
                                ? 'Update your mural legacy by editing this poem or story.'
                                : 'Contribute to the collective mural legacy by pinning a poem or story to a location.'}
                        </p>
                        <PoemForm onSubmit={handleFormSubmit} initialData={editingPoem} />
                    </div>
                )}

                {/* Drawer Back-shadow */}
                {isDrawerOpen && (
                    <div
                        onClick={function () { setDrawerOpen(false); }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                            background: 'rgba(0,0,0,0.5)', zIndex: 1999
                        }}
                    />
                )}

            </div>
        </ErrorBoundary>
    );
};

export default Home;