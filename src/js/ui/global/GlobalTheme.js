import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif'
    }
});
theme = responsiveFontSizes(theme);

export default theme;