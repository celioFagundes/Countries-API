import styled from 'styled-components';

export const Wrapper = styled.div`
  
`;

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:100%;

    @media(max-width:1000px){
        padding: 0 20px
    }
    
`;

export const InputsContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    padding:50px 0;
  
`;
export const SearchBox = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color: ${props => props.theme.colors.elements};
    padding:10px;
    border-radius:5px;
    box-shadow: 1px 0px 5px 1px rgba(0,0,0,0.2);
    @media(max-width:600px){
        width:100%;
        margin-bottom:10px
    }
    `;
export const SearchIcon = styled.button`
    border:0;
    background-color: transparent;
    cursor:pointer;
`;
export const SearchInput = styled.input`
    width: 300px;
    background-color: ${props => props.theme.colors.elements};
    border:0;
    margin-left:15px;
    outline:none;
    color:  ${props => props.theme.colors.text};
    text-transform: capitalize;

    &::placeholder{
        color:${props => props.theme.colors.text};
    }

    @media(max-width:600px){
        width:100%;
    }
`;

export const FilterSelect = styled.select`
    background-color: ${props => props.theme.colors.elements};
    color:${props => props.theme.colors.text};
    padding:14px;

    border:0;
    border-radius:5px;
    outline:none;
    box-shadow: 1px 0px 5px 1px rgba(0,0,0,0.2);
`;

export const FilterOption = styled.option`
    width:100px;
`;

export const CardsContainer  = styled.div`
    display:flex;
    justify-content:${props => props.length >= 4 ? 'space-between' : 'flex-start'};
    align-items:center;
    flex-wrap:wrap;

    @media(max-width:600px){
        justify-content:center;
    }
`;
