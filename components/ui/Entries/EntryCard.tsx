import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../../interfaces';
import { UIContext } from '../../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../../utils';

interface Props {
    entry: Entry;
}


export const EntryCard:FC<Props> = ({entry}) => {

    const router = useRouter();

    const {startDragging,finishDragging} = useContext(UIContext);

    const onDragStart= (event:DragEvent<HTMLDivElement>) =>{ 
        event.dataTransfer.setData('entryId', entry._id)
        startDragging();
        //Todo: Modificar el estado para indicar que estoy haciendo drag
    }

    const onDragEnd = (event:DragEvent<HTMLDivElement>) =>{
        //Todo: Cancelar on drag
        finishDragging();
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`);
    }

  return (
    <Card 
        onClick={onClick}
        sx={{marginBottom:1,maxHeight:100}}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
    >
        <CardActionArea>

            <CardContent>
                <Typography sx={{whiteSpace:'nowrap', textOverflow: 'ellipsis',overflow:'hidden'}}>
                    {entry.description}
                </Typography>
            </CardContent>
            
            <CardActions sx={{display:'flex', justifyContent:'end', paddingRight:2}}>
                <Typography variant='body2'>
                    {dateFunctions.getFormattedDate(entry.createdAt)}
                </Typography>
            </CardActions>
        
        </CardActionArea>
    </Card>
  );
}
