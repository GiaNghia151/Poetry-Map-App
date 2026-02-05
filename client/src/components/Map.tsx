import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// marker icons not needed if we use custom divIcons, but good for fallback
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

var DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    onMapClick?: (lat: number, lng: number) => void;
    onEditPoem?: (poem: any) => void;
}

const MapComponent: React.FC<MapProps> = (props) => {
    const onMapClick = props.onMapClick;
    const onEditPoem = props.onEditPoem;
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        var timer: any = null;

        timer = setTimeout(function () {
            if (mapRef.current && !mapInstance.current) {
                try {
                    // Initialize map with dark background
                    var map = L.map(mapRef.current, {
                        zoomControl: false,
                        tap: false
                    }).setView([20, 0], 3);

                    mapInstance.current = map;

                    // CartoDB Dark Matter tiles
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; OSM &copy; CARTO',
                        subdomains: 'abcd',
                        maxZoom: 20
                    }).addTo(map);

                    // Reposition zoom control
                    L.control.zoom({ position: 'bottomright' }).addTo(map);

                    // Add map click listener
                    map.on('click', function (e: any) {
                        if (onMapClick && e.latlng) {
                            onMapClick(e.latlng.lat, e.latlng.lng);
                        }
                    });

                    // Add popup listener for deletion and editing
                    map.on('popupopen', function (e: any) {
                        var popup = e.popup;
                        var element = popup.getElement();
                        if (element) {
                            var deleteBtn = element.querySelector('.delete-story-btn');
                            if (deleteBtn) {
                                deleteBtn.onclick = function () {
                                    var id = deleteBtn.getAttribute('data-id');
                                    if (window.confirm('Delete this mural story permanently?')) {
                                        fetch('/api/poems/' + id, { method: 'DELETE' })
                                            .then(function (res) {
                                                if (res.ok) {
                                                    map.closePopup();
                                                    window.location.reload();
                                                } else {
                                                    alert('Could not delete story.');
                                                }
                                            })
                                            .catch(function (err) {
                                                alert('Error: ' + err.message);
                                            });
                                    }
                                };
                            }

                            var editBtn = element.querySelector('.edit-story-btn');
                            if (editBtn) {
                                editBtn.onclick = function () {
                                    var poemData = JSON.parse(editBtn.getAttribute('data-poem') || '{}');
                                    if (onEditPoem) {
                                        onEditPoem(poemData);
                                        map.closePopup();
                                    }
                                };
                            }
                        }
                    });

                    // Fetch real data
                    fetch('/api/poems')
                        .then(function (res) { return res.json(); })
                        .then(function (poems) {
                            if (Array.isArray(poems)) {
                                for (var i = 0; i < poems.length; i++) {
                                    var p = poems[i];
                                    if (p.location && p.location.coordinates) {
                                        var lat = p.location.coordinates[1];
                                        var lng = p.location.coordinates[0];

                                        var customIcon = L.divIcon({
                                            className: 'mural-marker',
                                            html: '<div class="mural-marker-inner" style="border-color: #fff; background-image: url(' + (p.imageUrl || '') + '); background-color: #222;"></div>',
                                            iconSize: [30, 30],
                                            iconAnchor: [15, 15]
                                        });

                                        var poemJson = JSON.stringify(p).replace(/"/g, '&quot;');
                                        var popupContent =
                                            '<div style="min-width: 180px; padding: 5px;">' +
                                            '<strong style="font-family: monospace; font-size: 14px; color: #fff;">' + p.title + '</strong>' +
                                            '<p style="color: #ccc; margin: 10px 0; font-size: 13px;">' + p.content + '</p>' +
                                            '<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; border-top: 1px solid #333; padding-top: 10px;">' +
                                            '<small style="color: #666;">' + p.author + '</small>' +
                                            '<div style="display: flex; gap: 10px;">' +
                                            '<button class="edit-story-btn" data-id="' + p._id + '" data-poem="' + poemJson + '" style="background: none; border: none; color: #4da6ff; cursor: pointer; font-size: 10px; font-family: monospace; text-transform: uppercase; padding: 0;">Edit</button>' +
                                            '<button class="delete-story-btn" data-id="' + p._id + '" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 10px; font-family: monospace; text-transform: uppercase; padding: 0;">Delete</button>' +
                                            '</div>' +
                                            '</div>' +
                                            '</div>';

                                        L.marker([lat, lng], { icon: customIcon })
                                            .addTo(map)
                                            .bindPopup(popupContent);
                                    }
                                }
                            }
                        })
                        .catch(function (err) { console.error('Fetch poems error:', err); });

                    setTimeout(function () {
                        map.invalidateSize();
                    }, 500);

                } catch (err) {
                    console.error('Mural Map init error:', err);
                }
            }
        }, 800);

        return () => {
            if (timer) clearTimeout(timer);
            if (mapInstance.current) {
                try {
                    mapInstance.current.remove();
                } catch (e) {
                    console.warn('Map cleanup warning:', e);
                }
                mapInstance.current = null;
            }
        };
    }, [onMapClick]);

    return (
        <div
            id="map"
            ref={mapRef}
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#111',
                zIndex: 0,
                pointerEvents: 'auto'
            }}
        />
    );
};

export default MapComponent;