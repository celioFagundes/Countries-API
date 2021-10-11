import React from 'react'
import { 
    CardBox,
    Image,
    CountryInfo,
    CountryTitle,
    Info,
    InfoSpan, } from './style'
function Card(props) {
    return (
        <CardBox  length = {props.length}>
            <Image src = {props.img} alt = {props.alt}/>
            <CountryInfo>
                <CountryTitle>{props.name}</CountryTitle>
                <Info><InfoSpan>Population:</InfoSpan> {props.population}</Info>
                <Info><InfoSpan>Region:</InfoSpan> {props.region}</Info>
                <Info><InfoSpan>Capital:</InfoSpan> {props.capital}</Info>
            </CountryInfo>
        </CardBox>
    )
}

export default Card
