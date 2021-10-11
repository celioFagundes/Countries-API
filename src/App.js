import React,{useState} from 'react';

import {ThemeProvider} from 'styled-components'
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import GlobalStyle from './styles/global';
import CountriesContext from './components/ContextCountries/context'
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import DetailPage from './components/DetailPage/DetailPage';
import {HashRouter, Switch, Route} from 'react-router-dom'
function App() {

  const [theme,setTheme] = useState(dark)

  const handleTheme = () =>{
    setTheme(theme.title === 'dark' ? light : dark)
  }
  return (
    <ThemeProvider theme = {theme}>
      <HashRouter>
        <div className="App">
          <GlobalStyle/> 
          <Header toggleTheme = {handleTheme} theme = {theme.title}/>
          <Switch>
            <CountriesContext>
              <Route exact path="/" render={(props) => <HomePage {...props} theme ={theme.title}/>} />
              <Route exact path="/details/:id" render={(props) => <DetailPage {...props} theme ={theme.title}/>} />
            </CountriesContext>
          </Switch>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
