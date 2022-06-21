import { EntriesState } from './';
import { EntryStatus, Entry } from '../../interfaces/entry.interface';


type EntriesActionType =
|{ type: '[Entries] - Estado inicial'; payload: Entry[] }
|{type: '[Entries] - Agregar nueva entrada', payload: Entry}
|{type: '[Entries] - Eliminar entrada', payload: string}
|{type: '[Entries] - Editar entrada', payload: {id:string,description:string,status:EntryStatus}}
|{type: '[Entries] - Cambiar estado de entrada', payload: {id: string, status: EntryStatus}}


export const entriesReducer = (state:EntriesState, action:EntriesActionType ):EntriesState => {
    switch (action.type) {
        case '[Entries] - Estado inicial':
            return {
                ...state,
                entries: [...action.payload]
            }
        case '[Entries] - Agregar nueva entrada':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            };
        case '[Entries] - Cambiar estado de entrada':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload.id) {
                        return {
                            ...entry,
                            status: action.payload.status
                        };
                    }
                    return entry;
                })
            };
        case '[Entries] - Eliminar entrada':
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload)
            };
        case '[Entries] - Editar entrada':
            return {
                ...state,
                entries: state.entries.map(entry => { 
                    if (entry._id === action.payload.id) {
                        return {
                            ...entry,
                            description: action.payload.description,
                            status: action.payload.status
                        };
                    }
                    return entry;
                })
            };
        default:
            return state;
    }
};