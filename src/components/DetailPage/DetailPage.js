import React, {useState,useEffect,useReducer} from 'react'
import { Wrapper,Back,Container ,Image, InfoContainer, Title, InfoColumns, Column,Info,BordersContainer, Button, BorderLabel, Span,} from './styles'

import { Link} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import {SyncLoader} from 'react-spinners'
import { useCountriesContext } from '../ContextCountries/context'

function DetailPage({match,theme}) {
    
    const {countries,setCountries} = useCountriesContext()
    const [loading,setLoading] = useState(true)

    const initialState = {
        country: [],
        nativeName: [],
        languagesObj:{},
        languagesList : [],
        borders: [],
        countriesId: [],
        borderCountries: []
    }

    function reducer(state,action){
        switch(action.type){
            case 'country':
                return { ...state,country: action.payload};
            case 'native':
                return {...state, nativeName : action.payload};
            case 'langobject':
                return {...state, languagesObj: action.payload};
            case 'borders': 
                return{...state, borders: action.payload};    
            case 'IDs': 
                return {...state, countriesId: action.payload};
            case 'bordersCountries':
                return {...state, borderCountries: action.payload};
            case 'langList' :
                return {...state, languagesList: action.payload}
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
            dispatch({type:'country',payload: data[0]})
            dispatch({type:'native', payload: data[0].name.nativeName})
            dispatch({type: 'langobject', payload: data[0].languages})
            dispatch({type:'borders', payload: data[0].borders})
            setLoading(false)
        })

    }, [match.params.id])

    //Converts the language objects into an array
    useEffect(() =>{
        
        let list = []
        for(let lang in state.languagesObj){
            list.push(state.languagesObj[lang])
        }
        dispatch({type :'langList', payload : list})
    
    },[state.languagesObj])
    
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


    //Compares the obj array with the borders arrays to match the border and cca3 parameters
    useEffect(()=>{
        if(state.borders){
        let filter = state.countriesId.filter(item => state.borders.includes(item.id))
        dispatch({type :'bordersCountries',payload: filter})
    
        }
    },[state.borders,state.countriesId])

    const renderCapitals = () =>{
        
        if(state.country.capital){
        return  state.country.capital.map((cap,index) =>(
            <div key = {index}> {index !== state.country.capital.length - 1 ? cap + ',' : cap} </div>
            ))}
        else{
            return <div>No capital</div>
        }
    }

    const renderlanguages = () =>{
        if(state.languagesList.length > 0){
         return state.languagesList.map((item,index) =>(
            <div key = {index}>
                {index !== state.languagesList.length -1 ? item + ',' : item}
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
                <Image src = {state.country.flags.svg} alt = {state.country.name.common}/>
                <InfoContainer>
                    <Title>{state.country.name.common}</Title>
                    <InfoColumns>
                        <Column>
                            <Info><Span>Native Name:</Span>
                                { state.country.name.nativeName ?   Object.values(state.nativeName)[0].common : 'No native name'}
                             </Info>
                            <Info><Span>Population:</Span>
                                {state.country.population.toLocaleString('pt-br')}
                            </Info>
                            <Info><Span>Region:</Span>
                                {state.country.region}
                            </Info>
                            <Info><Span>Sub Region:</Span>
                                {state.country.subregion ? state.country.subregion : 'No subregions'}
                            </Info>
                            <Info><Span>Capital:</Span> 
                                {renderCapitals()}
                            </Info>
                        </Column>
                        <Column>
                            <Info><Span>Top Level Domain:</Span>
                                {state.country.tld}
                            </Info>
                            <Info><Span>Currencies:</Span>
                                {state.country.currencies ? Object.values(state.country.currencies)[0].name : 'No currencies'}
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
