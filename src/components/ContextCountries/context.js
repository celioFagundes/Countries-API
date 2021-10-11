import React, {useState,useContext,createContext} from 'react'

const CountriesContext = createContext();

export default function Context({children})  {
    const [countries,setCountries] = useState([])

    return (
        <CountriesContext.Provider value = {{countries,setCountries}}>
                {children}
        </CountriesContext.Provider>
    )
};

export function useCountriesContext(){
    const context = useContext(CountriesContext);
    const {countries,setCountries} = context;
    return {countries,setCountries};
}