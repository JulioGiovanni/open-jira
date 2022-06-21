import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Entry,IEntry } from '../../../../models';
import { db } from '../../../../database';

type Data = 
    |{message: string}
    |IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const id:any = req.query.id; 
    
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }

    switch (req.method) {
        case 'GET':
            return getEntryById(id, res);
        case 'PUT':
            return updateEntry(id, req, res);
        case 'DELETE':
            return deleteEntry(id, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

    
}

const getEntryById = async(id: string, res: NextApiResponse<Data>) => {
    try {
        await db.connect();
        const entry = await Entry.findById(id);
        await db.disconnect();
        if(!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json(entry);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Algo fallo, revisar logs del servidor' });

    }
}


const updateEntry = async(id: string, req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {
        await db.connect();
        const entry = await Entry.findById(id);
        
        if(!entry) {
            await db.disconnect();
            return res.status(404).json({ message: 'Entry not found' });
        
        }

        const { 
            description = entry.description, 
            status = entry.status 
        } = req.body;

        entry.description = description;
        entry.status = status;
        entry.updatedAt = Date.now();
        await entry.save();
        await db.disconnect();
        return res.status(200).json(entry);
    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(500).json({ message: 'Algo fallo, revisar logs del servidor' });

    }
    
    

}

const deleteEntry = async(id: string, res: NextApiResponse<Data>) => {


    try {   
        await db.connect();
        const entry = await Entry.findById(id);
        if(!entry) {
            await db.disconnect();
            return res.status(404).json({ message: 'Entry not found' });
        }
        await entry.remove();
        await db.disconnect();
        return res.status(200).json({ message: 'Entry deleted' });
    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(500).json({ message: 'Algo fallo, revisar logs del servidor' });

    }
}
