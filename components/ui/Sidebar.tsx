import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox','Starred','Send email','Drafts'];

export const Sidebar = () => {

    const { sideMenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer
        anchor="left"
        open={sideMenuOpen}
        onClose={closeSideMenu}
    >
        <Box sx={{width: '250px'}}>
    
            <Box sx={{ padding:'5px 10px' }}>
                <Typography variant='h4'>
                    Menú
                </Typography>
            </Box>
            <Divider/>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Box>

    </Drawer>
  )
}
