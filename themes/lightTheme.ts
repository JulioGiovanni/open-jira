import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: grey[300],
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
                   
                },
            }
        },
    },
});