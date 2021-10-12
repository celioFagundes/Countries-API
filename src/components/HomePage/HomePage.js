import React ,{useEffect,useState,useCallback}from 'react'
import { useCountriesContext } from '../ContextCountries/context'
import { 
    Wrapper,
    Container,
    InputsContainer,
    SearchBox,
    SearchInput,
    FilterSelect,
    FilterOption,
    SearchIcon,
    CardsContainer,
    } from '../HomePage/style'
import {AiOutlineSearch} from 'react-icons/ai'
import {SyncLoader} from 'react-spinners'
import {Link} from 'react-router-dom'
import Card from '../Card/Card'

function HomePage(props) {

    const {countries,setCountries} = useCountriesContext()
    const [ filterList, setFilterList] = useState([])
    const [loading,setLoading] = useState(true)
    const [ displayList,setDisplayList] = useState([])
    const [selected, setSelected] = useState('All')
    const [input,setInput] = useState('')


    
    useEffect(() => {
        
        if(!countries.length > 0){
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            setCountries(data)
        })
        
         }
        
    }, [setCountries,countries.length])
    
    useEffect(() =>{
        if(countries.length > 0){
        setLoading(false)}
    },[countries,countries.length])
    const handleChange = useCallback(evt =>{
        setInput(evt.target.value)
    },[])
    
    const handleSelect = useCallback((e) =>{
        setSelected(e.target.value)
    },[])
        
    

    const changeDisplayList = useCallback(() => {
        if(selected !== 'All'){
            setFilterList([])
            let newList = countries.filter(item => item.region === selected && item.name.common.toLowerCase().includes(input))
            setFilterList(filterList => [...filterList,...newList])
            }else{
                let newList = countries.filter(item => item.name.common.toLowerCase().includes(input))
                setFilterList(newList)
            }

        },[selected,input,countries])
    useEffect(() =>{
        changeDisplayList()
    },[changeDisplayList])

    useEffect(() =>{
        setDisplayList(filterList)
    },[filterList])

    const renderCapitals = capitals =>{
        
        if(capitals){
        return  capitals.map((cap,index) =>(
            index !== capitals.length - 1 ? cap + ',' : cap
            ))}
        else{
            return 'No capital'
        }
    }
    if(loading){
        return (
        <div style = {{display:'flex', flexDirection: 'column', alignItems:'center' ,justifyContent:'center',height:'40vh'}}>
            <SyncLoader  size = {12} color = {props.theme === 'dark' ? '#fff' : '#000'} loading = {loading}/>
        </div>)
    }
    
    return (
       <Wrapper>    
           <Container className ='container'>
                <InputsContainer>
                    <SearchBox>
                        <SearchIcon>
                            <AiOutlineSearch size = {22} color = {props.theme === 'dark' ? '#fff' : '#000'}/>
                        </SearchIcon>
                        <SearchInput placeholder = 'Search for a country ..' type = 'text' onChange = {handleChange} value = {input}/>
                    </SearchBox>
                    <FilterSelect value = {selected} onChange = {handleSelect}>
                        <FilterOption value="" hidden>Filter by Region</FilterOption>
                        <FilterOption value ='All'>All</FilterOption>
                        <FilterOption value ='Africa'>Africa</FilterOption>
                        <FilterOption value ='Americas'>Americas</FilterOption>
                        <FilterOption value ='Asia'>Asia</FilterOption>
                        <FilterOption value ='Europe'>Europe</FilterOption>
                        <FilterOption value ='Oceania'>Oceania</FilterOption>
                    </FilterSelect>
                </InputsContainer>
                <CardsContainer length = {displayList.length}>
                    {displayList.map((item,index) =>(
                        <Link to = {'/details/' + item.cca2} key = {index}>
                            <Card 
                            key = {index} 
                            length = {displayList.length}
                            img = {item.flags.svg}
                            alt= {item.name}
                            name = {item.name.common}
                            population = {item.population.toLocaleString('pt-br')}
                            region = {item.region}
                            capital = {renderCapitals(item.capital)}
                            />
                        </Link>
                        
                    ))}
                    
                </CardsContainer>
           </Container>
       </Wrapper>
    )
}

export default HomePage
