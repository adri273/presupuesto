import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import {Route, Switch} from 'wouter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#26E2EC'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className='App'>
      <Container>
      <Header />
      <Switch>
        <Route path='/partner_test/:id' component={Form} />
        <Route path="/:rest*">
          {(params) => `404, Sorry the page ${params.rest} does not exist!`}
        </Route>
      </Switch>
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;
