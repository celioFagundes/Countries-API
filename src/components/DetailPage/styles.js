import styled from 'styled-components';

export const Wrapper  = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    padding:50px;
    width:100%;
    
    @media(max-width: 600px){
        padding:20px;
    }
    
`;

export const Back = styled.button`
    display:flex;
    align-items:center;
    justify-content:space-around;
    background-color:${props => props.theme.colors.elements};
    border:0;
    width:120px;
    border-radius:5px;
    padding:7px 20px;
    box-shadow: 1px 0px 5px 1px rgba(0,0,0,0.2);
    color: ${props => props.theme.colors.text};
    margin-bottom:50px;
    cursor: pointer;

    &:hover{
        background-color: rgba(0,0,0,0.1);
  }
    
`;
export const Container = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-weight:300;
    flex-wrap:wrap;
    width:100%;
    
`;
export const Image = styled.img`
    height:300px;
    width:500px;
    object-fit:cover;
    box-shadow: 1px 0px 5px 1px rgba(0,0,0,0.2);
    @media(max-width: 600px){
        height:250px;
        width:100%;
        
    }
    
    
`;
export const InfoContainer = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    justify-content:space-between;
    align-items:flex-start;
    margin-right:50px;
    @media(max-width: 1000px){
        width:500px;
        margin-top:30px;
    }
    @media(max-width: 600px){
        height:200px;
        width:100%;
        
    }
    
`;

export const Title = styled.h1`
   @media(max-width: 1000px){
        margin-bottom:20px;
    }
`;
export const  InfoColumns= styled.div`
    display:flex;
    justify-content:center;
    align-items:center;

    @media(max-width: 1000px){
        flex-direction:column;
    }
    
    
`;
export const Column = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    height:100%;
    margin-right:10px;

    @media(max-width: 1000px){
        margin-bottom:30px;
    }
    
`;
export const Info = styled.div`
    display:flex;
    max-width:200px;
    flex-wrap:wrap;
    margin-bottom: 10px;
    
`;
export const Span = styled.span`
    font-weight: 600;
    margin-right:5px;
  
`;
export const BordersContainer = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    flex-wrap:wrap;
    width:400px;

    @media(max-width: 600px){
        height:200px;
        width:100%;
        
    }
`;
export const BorderBox = styled.div`
    display:flex;
    flex-wrap:wrap;
    height:20px;
  
`;
export const BorderLabel = styled.p`
    @media(max-width: 1000px){
        width:100%;
        margin-bottom:10px;
    }
`;
export const Button = styled.button`
  background-color:${props => props.theme.colors.elements};
  color: ${props => props.theme.colors.text};
  width:120px;
  box-shadow: 1px 0px 5px 1px rgba(0,0,0,0.2);
  border:0;
  border-radius:5px;
  padding:5px 15px;
  margin: 0 5px 5px 0;
  cursor:pointer;

  &:hover{
      background-color: rgba(0,0,0,0.1);
      
  }
`;