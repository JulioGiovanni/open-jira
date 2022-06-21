import { FC, useEffect, useReducer } from 'react';
import { EntriesContext,entriesReducer } from './'; //Cambiar Reducer a minúsculas
import { Entry, EntryStatus } from '../../interfaces';
import { useSnackbar } from 'notistack';
import entriesApi from '../../apis/entriesApi';
import { useRouter } from 'next/router';


export interface EntriesState{
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}

interface Props {
    children: any;
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const router = useRouter();

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE); //Cambiar Reducer a minúsculas
    
    const { enqueueSnackbar } = useSnackbar();
    
    const addEntry = async (description: string) => {

        // const newEntry:Entry = {
        //     _id: uuidv4(),
        //     description,
        //     status: 'PENDING',
        //     createdAt: Date.now(),
        //     updatedAt: Date.now()
        // }

        const { data } = await entriesApi.post<Entry>( '/entries',{ description });


        dispatch({
            type: '[Entries] - Agregar nueva entrada',
            payload: data
        });
    }


    const removeEntry = async(id: string) => {

        await entriesApi.delete(`/entries/${id}`);

        enqueueSnackbar('Entrada eliminada', { 
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            } 
        });

        dispatch({
            type: '[Entries] - Eliminar entrada',
            payload: id
        });

        router.push('/');
    }

    const updateEntry = async(id: string, description: string,status:EntryStatus) => {

        try {
            await entriesApi.put<Entry>(`/entries/${id}`, { description,status });
            
            enqueueSnackbar('Entrada actualizada', { 
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                } 
            });
            dispatch({
                type: '[Entries] - Editar entrada',
                payload: { id, description,status }
            });    
        } catch (error) {
            console.log(error);
        }

        
    }

    const updateEntryStatus = async (id: string, status: EntryStatus) => {
        try {
            await entriesApi.put<Entry>(`/entries/${id}`, { status });

            dispatch({
                type: '[Entries] - Cambiar estado de entrada',
                payload: { id, status }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const refreshEntries = async () => {
        const { data }  = await entriesApi.get<Entry[]>('/entries');
        dispatch({
            type: '[Entries] - Estado inicial',
            payload: data
        });
    }



    useEffect(() => {
        refreshEntries();
    }, [])
    
    return (
        <EntriesContext.Provider value={{
            ...state,
            addEntry,
            removeEntry,
            updateEntry,
            updateEntryStatus

        }}>
            { children }
        </EntriesContext.Provider>
    )
}