import React, {useState,useEffect,useReducer} from 'react'
import { Wrapper,Back,Container ,Image, InfoContainer, Title, InfoColumns, Column,Info,BordersContainer, Button, BorderLabel, Span,} from './styles'

import { Link} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import {SyncLoader} from 'react-spinners'
import { useCountriesContext } from '../ContextCountries/context'

function DetailPage({match,theme}) {
    
    const {countries,setCountries} = useCountriesContext()
    const [country, setCountry] = useState({})
    const [loading,setLoading] = useState(true)

    const initialState = {
        countriesId: [],
        borderCountries: []
    }

    function reducer(state,action){
        switch(action.type){
            case 'IDs': 
                return {...state, countriesId: action.payload};
            case 'bordersCountries':
                return {...state, borderCountries: action.payload};
            default: return  state
                
        }
    }

    const [state,dispatch] = useReducer(reducer,initialState)

    useEffect(() => {
        
        if(!countries.length > 0){
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountries(data))
        
         }
        
    }, [setCountries,countries.length])
    
    useEffect(() =>{
        fetch('https://restcountries.com/v3.1/alpha/' + match.params.id )
        .then(res => res.json())
        .then(data => {
            setCountry(data[0])
            setLoading(false)
        })

    }, [match.params.id])

 
    
    //Create a array of obj with id as country cca3 and name as country name

    useEffect(() =>{
        let idList = []
        for(let c in countries){
            idList.push({
                name:countries[c].name.common,
                id: countries[c].cca3
                })
        }
        dispatch({type: 'IDs', payload: idList})
    },[countries])


    //Compares the ids array with the borders arrays to match the border and cca3 parameters
    useEffect(()=>{
        
        if(country.borders){
        let filter = state.countriesId.filter(item => country.borders.includes(item.id))
        dispatch({type :'bordersCountries',payload: filter})
    
        }
    },[country.borders,state.countriesId])

    const renderCapitals = () =>{
        
        if(country.capital){
        return  country.capital.map((cap,index) =>(
            <div key = {index}> {index !== country.capital.length - 1 ? cap + ',' : cap} </div>
            ))}
        else{
            return <div>No capital</div>
        }
    }

    const renderlanguages = () =>{
        if(country.languages){
        const keys = Object.values(country.languages)
         return keys.map((item,index) =>(
            <div key = {index}>
                {index !== keys.length -1 ? item + ',' : item}
            </div>))}  
        else{
            return <div>No languages</div>
        }
    }
    
    const renderBorders = () =>{
        if(state.borderCountries.length > 0){
            return state.borderCountries.map((item,index) => (
            <Link to = {'/details/' + item.id} key = {index} ><Button>{item.name}</Button></Link>))
        }else{
            return <div>No borders</div>
        }
    }
    const renderCurrencies = () =>{
        if(country.currencies){
            const keys = Object.values(country.currencies)
            return  keys.map((item,index) =>(
                <p key = {index}>{ index !== keys.length - 1 ? item.name + ',' : item.name }</p>
            ))
        }else{
            return <div>No currencies</div>
        }
      
    }

    if(loading){
        return (
        <div style = {{display:'flex', flexDirection: 'column', alignItems:'center' ,justifyContent:'center',height:'40vh'}}>
            <SyncLoader  size = {12} color = {theme === 'dark' ? '#fff' : '#000'} loading = {loading}/>
        </div>)
    }
    return (    
        <Wrapper className = 'container'>
            <Link to ='/' style={{ textDecoration: 'none' }}>
                <Back><BsArrowLeft color = {theme ==='dark' ? '#fff' : '#000'} size = {22}/>Back</Back>
            </Link>
            <Container >
                <Image src = {country.flags.svg} alt = {country.name.common}/>
                <InfoContainer>
                    <Title>{country.name.common}</Title>
                    <InfoColumns>
                        <Column>
                            <Info><Span>Native Name:</Span>
                                { country.name.nativeName 
                                ?   Object.values(country.name.nativeName)[0].common 
                                : 'No native name'
                                }
                             </Info>
                            <Info><Span>Population:</Span>
                                {country.population.toLocaleString('pt-br')}
                            </Info>
                            <Info><Span>Region:</Span>
                                {country.region}
                            </Info>
                            <Info><Span>Sub Region:</Span>
                                {country.subregion ? country.subregion : 'No subregions'}
                            </Info>
                            <Info><Span>Capital:</Span> 
                                {renderCapitals()}
                            </Info>
                        </Column>
                        <Column>
                            <Info><Span>Top Level Domain:</Span>
                                {country.tld}
                            </Info>
                            <Info><Span>Currencies:</Span>
                              {  renderCurrencies()}
                             </Info>
                            <Info><Span>Languages:</Span> 
                                {renderlanguages()}
                            </Info>
                        </Column>
                    </InfoColumns>
                    <BordersContainer>
                        <BorderLabel><Span>Border Countries:</Span></BorderLabel>
                        {renderBorders()}
                    </BordersContainer>
                </InfoContainer>
            </Container>
        </Wrapper>
    )
}

export default DetailPage
