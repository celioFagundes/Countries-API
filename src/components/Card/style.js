import styled from 'styled-components';

export const CardBox = styled.div`
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    align-items:flex-start;
    position:relative;
    height:300px;
    width:250px;
    background-color: ${props => props.theme.colors.elements};
    color:${props => props.theme.colors.text};
    box-shadow: 1px 0px 5px 1px rgba(0,0,0,0.2);
    margin-bottom:50px;
    border-radius:5px;
    margin-right:${props => props.length > 4 ? '0px' : '80px'};
    &:hover{
      
      box-shadow: 1px 0px 5px 5px rgba(0,0,0,0.2);
  }
  @media(max-width:600px){
        margin-right:0px;
    }

`;
export const Image = styled.img`
    min-height:150px;
    max-height:150px;
    width:100%;
    object-fit:cover;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    
`;

export const CountryInfo = styled.div`
    position:absolute;
    top:170px;
    left:20px;
    
    
`;

export const  CountryTitle= styled.h2`
    font-size:18px;
    font-weight:600;
    margin-bottom:15px;
`;

export const Info = styled.p`
    
    font-weight:300;
`;
export const InfoSpan = styled.span`
    font-weight:600;
`;