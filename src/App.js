import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import Error404 from './components/Error404/Error404'
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Route, Switch} from 'wouter';

//Apply HelloTeca color styles
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
    <div className='app'>
      <div className="app__content">
        <div className='content__left'>
        </div>
        <div className='content__right'>
          <Container>
            <Header />
            <Switch>
              <Route path='/partner_test/:id' component={Form} />
              <Route path="/:rest*">
                <Error404 />
              </Route>
            </Switch>
          </Container>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
