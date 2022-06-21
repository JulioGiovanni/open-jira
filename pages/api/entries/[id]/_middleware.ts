import mongoose from 'mongoose';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware (req: NextRequest, ev: NextFetchEvent) {
    
    // const id = req.page.params?.id || '';
    
    // if(!mongoose.isValidObjectId(id)) {
    //     return new Response('Invalid id', { 
    //         status: 400,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         } 
    //     });
    // }

    // NextResponse.next();
}