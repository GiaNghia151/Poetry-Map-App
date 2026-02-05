import { Request, Response } from 'express';
import Poem from '../models/Poem';

// Add a new poem
export const addPoem = async (req: Request, res: Response) => {
    try {
        const { title, content, location, imageUrl, author } = req.body;
        console.log('Adding poem, body:', req.body);

        let coordinates = [0, 0];
        if (location && typeof location === 'object' && location.coordinates) {
            coordinates = location.coordinates;
        } else if (req.body.lat !== undefined && req.body.lng !== undefined) {
            // Ensure coordinates are numbers
            coordinates = [Number(req.body.lng), Number(req.body.lat)];
        }

        console.log('Coordinates set to:', coordinates);

        const newPoem = new Poem({
            title,
            content,
            imageUrl,
            author: author || 'Anonymous',
            location: {
                type: 'Point',
                coordinates: coordinates
            },
            userId: (req as any).userId || undefined
        });

        await newPoem.save();
        res.status(201).json(newPoem);
    } catch (error) {
        console.error('Add poem error full:', error);
        res.status(500).json({ message: 'Error adding poem', error: (error as any).message });
    }
};

// Get all poems
export const getPoems = async (req: Request, res: Response) => {
    try {
        const poems = await Poem.find();
        res.status(200).json(poems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving poems', error });
    }
};

// Delete a poem
export const deletePoem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Poem.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting poem', error });
    }
};

// Update a poem
export const updatePoem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, author, imageUrl } = req.body;
        
        const updatedPoem = await Poem.findByIdAndUpdate(
            id,
            { title, content, author, imageUrl },
            { new: true }
        );
        
        if (!updatedPoem) {
            return res.status(404).json({ message: 'Poem not found' });
        }
        
        res.status(200).json(updatedPoem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating poem', error });
    }
};