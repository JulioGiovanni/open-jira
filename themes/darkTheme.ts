import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: grey[900],
        },
        primary: {
            main: '#4a148c',
            // main: '#3f51b5',
        },
        secondary: {
            main: '#19857b',
            // main: '#f50057',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiAppBar: {
            defaultProps:{
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148c',  
                },
            }
        },
    },
});