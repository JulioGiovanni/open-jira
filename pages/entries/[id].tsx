import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';

import { GetServerSideProps } from 'next'

import {
    Grid, 
    Card, 
    CardHeader, 
    CardContent, 
    TextField, 
    CardActions, 
    Button, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    IconButton 
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from '../../components/layouts/Layout';
import { EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { IEntry } from '../../models';
import mongoose from 'mongoose';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils';

const estados:EntryStatus[]  = [
    'PENDING',
    'IN-PROGRESS',
    'FINISHED'
]

const estadosTraducidos = (estado:string) => {
    switch(estado){
        case 'PENDING':
            return 'Pendiente'
        case 'IN-PROGRESS':
            return 'En progreso'
        case 'FINISHED':
            return 'Terminado'
        default:
            return 'Pendiente'
    }
}

interface EntryProps {
    entry: IEntry
}

const EntryPage:FC<EntryProps> = ({entry}) => {

    const { updateEntry, updateEntryStatus,removeEntry } = useContext(EntriesContext);

    const [InputValue, setInputValue] = useState(entry.description);
    const [Estado, setEstado] = useState<EntryStatus>(entry.status);
    const [Touched, setTouched] = useState(false);

    const isNotValid = useMemo( () => InputValue.length <=0 && Touched, [])

    const onStatusChange = (event:ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.value as EntryStatus)
    }

    
const onSave = () => {
    if(InputValue.length === 0) return;

    updateEntry(entry._id, InputValue,Estado);
    setTouched(false);
}

  return (
    <Layout title={`Entrada ${entry._id}`}>
        <Grid
            container
            justifyContent={'center'}
            sx={{marginTop: 2}}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada: ${entry._id} `}
                        subheader={'Creada '+dateFunctions.getFormattedDate(entry.createdAt)}

                    />
                    <CardContent>
                        <TextField
                            sx={{marginBottom: 2,marginTop: 2}}
                            fullWidth
                            placeholder='Editar entrada'
                            label='Entrada'
                            multiline
                            onChange={(e) => setInputValue(e.target.value)}
                            value={InputValue}
                            helperText={isNotValid && 'La entrada no puede estar vacía' }
                            onBlur={() => setTouched(true)}
                            error={isNotValid}
                        />
                        <FormControl>
                            <FormLabel> Estado: </FormLabel>
                            <RadioGroup
                                row
                                value={Estado}
                                onChange={onStatusChange}
                            >
                                {estados.map(estado => (
                                    <FormControlLabel
                                        key={estado}
                                        value={estado}
                                        control={<Radio />}
                                        label={estadosTraducidos(estado)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                    </CardContent>
                    <CardActions>
                    <Button
                        variant='contained'
                        color='secondary'
                        endIcon={<SaveOutlinedIcon/>}
                        onClick={onSave}
                        fullWidth
                        disabled={InputValue.length <=0}
                    >
                        Guardar
                    </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
            <IconButton sx={{
                    position: 'fixed',
                    bottom:30,
                    right:30,
                    backgroundColor:'error.dark',
                }}
                onClick={() => removeEntry(entry._id)}
            >
                <DeleteOutlineOutlinedIcon/>
            </IconButton>
    </Layout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps = async (ctx:any) => {

    
        const { id } = ctx.params as { id: string };

        const entry = await dbEntries.getEntryById(id);
        //Si no encuentra una entrada válida
        if(!entry){
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        //Si si encuentra la entrada, la regresa
        return {
            props: {
                entry
            }
        }
}

export default EntryPage;