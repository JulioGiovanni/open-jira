import { useContext, useState } from 'react';
import { Button, Box, TextField, Modal, Backdrop, Fade } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { UIContext } from '../../../context/ui';
import { EntriesContext } from '../../../context/entries';



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 2,
  };


export const NewEntry = () => {
    const { addEntry } = useContext(EntriesContext);
    const { modalOpen,closeModal,finishAddingEntry } = useContext(UIContext)
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false)

    const onSave = () => {

        if(inputValue.trim() === ''){
            setTouched(true)
            return
        }
        addEntry(inputValue);
        setTouched(false)
        finishAddingEntry();
        setInputValue('')
        closeModal()
    }




  return (
    <Modal
        open={modalOpen}
        onClose={()=>{
            closeModal()
            finishAddingEntry()
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
    >
        <Fade in={modalOpen}>
            <Box  sx={style}>
            
                <TextField
                    fullWidth
                    sx={{
                        marginTop:2,
                        marginBottom:1,
                    }}
                    placeholder="Nueva entrada"
                    autoFocus
                    multiline
                    label="Nueva entrada"
                    variant="outlined"
                    color='info'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    helperText={touched && inputValue.length <= 0 && 'Este campo es requerido'}
                    error={ touched && inputValue.length <= 0 }
                    onBlur={() => setTouched(true)}
                />
                
                <Box display='flex' justifyContent='space-between'>
                    
                    <Button
                    variant='outlined'
                    color='error'
                    endIcon={<CancelOutlinedIcon/>}
                    onClick={()=>{
                        setTouched(false)
                        closeModal()
                        finishAddingEntry()
                        }
                    }
                    >
                        Cancelar
                    </Button>
                
                
                    <Button
                    variant='outlined'
                    color='secondary'
                    endIcon={<SaveOutlinedIcon/>}
                    onClick={onSave}
                    >
                        Guardar
                    </Button>
                    
                </Box>
            </Box>
        </Fade>
    </Modal>
  )
}
