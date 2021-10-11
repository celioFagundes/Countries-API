import React, {useState,useEffect,useCallback} from 'react'
import { Wrapper,Back,Container ,Image, InfoContainer, Title, InfoColumns, Column,Info,BordersContainer, Button, BorderLabel, Span,} from './styles'

import { Link} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import {SyncLoader} from 'react-spinners'
import { useCountriesContext } from '../ContextCountries/context'
function DetailPage({match,theme}) {
    
    const {countries,setCountries} = useCountriesContext()
    const [country,setCountry] = useState([])
    const [loading,setLoading] = useState(true)
    const [nativeName,setNativeName] = useState([])
    const [currencies,setCurrencies] = useState([])
    const [languagesObject,setLanguagesObject] = useState()
    const [languagesList,setLanguagesList] = useState([])
    const [borders,setBorders] = useState([])
    const [countriesId,setCountriesId] = useState([]) //All countries countries  codes (like : 'FRA') and names
    const [borderCountries,setBorderCountries] = useState([]) 
    
    useEffect(() => {
        
        if(!countries.length > 0){
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountries(data))
        
         }
        
    }, [setCountries,countries.length])
    useEffect(() =>{
        setLanguagesList([])
        setBorderCountries([])
        fetch('https://restcountries.com/v3.1/alpha/' + match.params.id )
        .then(res => res.json())
        .then(data => {
            setCountry(data[0])
            setNativeName(data[0].name.nativeName)
            setCurrencies(data[0].currencies)
            setLanguagesObject(data[0].languages)
            setBorders(data[0].borders)
            setLoading(false)
        })

    }, [match.params.id])

    //Converts the language objects into an array
    useEffect(() =>{
        
        for(let lang in languagesObject){
            setLanguagesList( languagesList =>[...languagesList,languagesObject[lang]])
        }
    
    },[languagesObject])
    
    //Create a array of obj with id as country cca3 and name as country name, using useCallback to solve eslint dependency error

    const createID = useCallback(() => {

            for(let c in countries){
                setCountriesId(countriesId =>[...countriesId, {
                    name : countries[c].name.common,
                    id: countries[c].cca3
                }])
            }
        }, [countries],
    )

    useEffect(() =>{

        createID()
        
    },[countries,createID])

    //Compares the obj array with the borders arrays to match the border and cca3 parameters
    useEffect(()=>{
        if(borders){
        let filter = countriesId.filter(item => borders.includes(item.id))
        setBorderCountries(borderCountries =>[...borderCountries,...filter])
        }
    },[borders,countriesId])

    if(loading){
        return <div style = {{display:'flex', flexDirection: 'column', alignItems:'center' ,justifyContent:'center',height:'40vh'}}><SyncLoader  size = {12} color = 'white' loading = {loading}/></div>
    }

    
    const renderCapitals = () =>{
        
        if(country.capital){
        return  country.capital.map((cap,index) =>(
            <div key = {index}> {index !== country.capital.length - 1 ? cap + ',' : cap} </div>
            ))}
        else{
            return <div>No capital</div>
        }
    }

    const renderlanguagesObject = () =>{
        if(languagesList.length > 0){
         return languagesList.map((item,index) =>(
            <div key = {index}>
                {index !== languagesList.length -1 ? item + ',' : item}
            </div>))}  
        else{
            return <div>No languages</div>
        }
    }
    
    const renderBorders = () =>{
        if(borderCountries.length > 0){
            return borderCountries.map((item,index) => (
            <Link to = {'/details/' + item.id} key = {index} ><Button>{item.name}</Button></Link>))
        }else{
            return <div>No borders</div>
        }
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
                                { country.name.nativeName ? Object.values(nativeName)[0].common : 'No native name'}
                             </Info>
                            <Info><Span>Population:</Span>
                                {country.population}
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
                                {country.currencies ? Object.values(currencies)[0].name : 'No currencies'}
                             </Info>
                            <Info><Span>Languages:</Span> 
                                {renderlanguagesObject()}
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
