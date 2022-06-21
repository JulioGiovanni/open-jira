export interface Entry {
    _id: string;
    description: string;
    status: EntryStatus;
    createdAt:number;
    updatedAt:number;
}

export type EntryStatus = 'PENDING' | 'IN-PROGRESS' | 'FINISHED';