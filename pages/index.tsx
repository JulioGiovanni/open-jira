import type { NextPage } from 'next'
import { Button, Card, CardHeader, Grid } from '@mui/material'
import { Layout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useContext } from 'react';
import { UIContext } from '../context/ui';


const HomePage: NextPage = () => {

  const { openModal,startAddingEntry } = useContext(UIContext)
 

  return (
    <Layout title='Home - Open Jira'>

      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)'  }}>
            <CardHeader 
              title="Pendientes"
              action={
                <Button
                  variant="outlined"
                  fullWidth
                  color='secondary'
                  startIcon={<AddCircleOutlineOutlinedIcon/>}
                  onClick={()=>{
                    openModal()
                    startAddingEntry()
                  }}
              >
                  Nueva 
              </Button>
              }
            />
            
              {/* Agregar nueva entrada */}
              <NewEntry/>
                
              {/* Listar entradas */}
              <EntryList
                status='PENDING'
              />


          </Card>  
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
        <Card sx={{ height: 'calc(100vh - 100px)'  }}>
            <CardHeader title="En Progreso"/>
            {/* Listar entradas */}
            <EntryList
              status='IN-PROGRESS'
            />
          </Card>  
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
        <Card sx={{ height: 'calc(100vh - 100px)'  }}>
            <CardHeader title="Completadas"/>
            {/* Listar entradas */}
            <EntryList
              status='FINISHED'
            />
          </Card>  
        </Grid>


      </Grid>      
      
    </Layout>
  )
}

export default HomePage
