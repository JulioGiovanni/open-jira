import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
    description: {type: String},
    status: {type: String,
        enum: {
            values: ['PENDING', 'IN-PROGRESS', 'FINISHED'],
            message: '{VALUE} no es un status permitido',
        },
        default: 'PENDING'
    },
    createdAt: {type: Number},
    updatedAt: {type: Number}
})

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;