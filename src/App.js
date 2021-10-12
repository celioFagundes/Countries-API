import React,{useState,useEffect} from 'react';
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

  const [theme,setTheme] = useState(light)

  const handleTheme = () =>{
    setTheme(theme.title === 'dark' ? light : dark)
  }
    // get theme saved
    useEffect(() =>{
        const temp = localStorage.getItem('theme')
        const themeLoad = JSON.parse(temp)
        if(themeLoad){
            setTheme(themeLoad)
        }
    }, [setTheme])

    // save on LocalStorage
    useEffect(() =>{
        const temp = JSON.stringify(theme)
        localStorage.setItem('theme',temp)
    },[theme,setTheme])

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
