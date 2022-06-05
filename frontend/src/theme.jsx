import { green, red } from "@mui/material/colors";
import { createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette:{
        primary:{
            main:red[300],
        },
        secondary:{
            main:green[400],
        },
    }
})