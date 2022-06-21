import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting 
 * 3 = disconnecting
**/


const mongoConnection = {
    isConnected: 0,

}

export const connect = async () => {

    if (mongoConnection.isConnected) {
        console.log('Ya estábamos conectados')
        return;
    }

    if(mongoose.connections.length > 0) {
        mongoConnection.isConnected =  mongoose.connections[0].readyState;

        if(mongoConnection.isConnected === 1){
            console.log("Usando conexión anterior")
            return;
        }

        await mongoose.disconnect();
    }

    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('conectado a MongoDB', process.env.MONGO_URI);
        mongoConnection.isConnected = 1;
    } catch (error) {
        mongoConnection.isConnected = 0;
        console.log(error);
    }
}

export const disconnect = async () => {

    if( process.env.NODE_ENV === 'development') return;

    if (mongoConnection.isConnected === 0) return;
    
    await mongoose.disconnect();

    console.log('desconectado de mongoDB');
    
    mongoConnection.isConnected = 0;
}