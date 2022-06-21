import { DragEvent, FC, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from '../';
import { EntryStatus } from '../../../interfaces';
import { useContext } from 'react';
import { EntriesContext } from '../../../context/entries';
import { UIContext } from '../../../context/ui';
import styles from './EntryList.module.css';


interface Props {
    status: EntryStatus
}


export const EntryList:FC<Props> = ({status}) => {
  
    const { entries,updateEntryStatus } = useContext(EntriesContext);
    const {isDragging,finishDragging} = useContext(UIContext)


  
  const filteredEntries = useMemo(()=>  entries.filter(entry => entry.status === status)  , [entries])
  
    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('entryId');
        updateEntryStatus(id, status);
        finishDragging();
    }

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }


  return (
    <div
        onDrop={onDropEntry}
        onDragOver={allowDrop}
        className={ isDragging ? styles.dragging : ''}
    >
        <Paper sx={{ 
                height: 'calc(100vh - 150px)', 
                overflow:'scroll', 
                backgroundColor:'transparent',
                '&::-webkit-scrollbar': { display: 'none' },
                padding: '5px 10px'
            }}>
            {/* Todo cambiará dependiendo si esto está haciendo drag o no */}
            
            <List sx={{opacity: isDragging ? 0.5 : 1, transition:'all .3s' }}>
                {
                    filteredEntries.map(entry => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))

                }
            </List>

        </Paper>
    </div>
  )
}
