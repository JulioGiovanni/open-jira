import { createContext } from 'react';
import { Entry,EntryStatus } from '../../interfaces';


interface ContextProps {
    entries: Entry[]; 
    
    
    
    // Métodos
    addEntry: (description: string) => void;
    removeEntry: (id: string) => void;
    updateEntry: (id: string, description: string,status:EntryStatus) => void;
    updateEntryStatus: (id: string, status: EntryStatus) => void;
}



export const EntriesContext = createContext({} as ContextProps);