import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
// import NowWhat from './components/NowWhat';
import MultipleSelectChip from './features/Select/Select';
import Chart from './features/Chart/Chart';
import CurrentWrapper from './features/Current/CurrentWrapper';
// import Counter from './features/Counter';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Wrapper>
      <Header />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '50px',
        marginRight: '50px',
      }}
      >
        <Box sx={{
          display: 'flex',
          width: '60%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
        >
          <CurrentWrapper />
        </Box>
        <MultipleSelectChip />
      </Box>
      <Chart />
    </Wrapper>
  </MuiThemeProvider>
);

export default App;
