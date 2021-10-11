import styled from 'styled-components';

export const Wrapper = styled.div`
   background-color:${props => props.theme.colors.elements};
   box-shadow: 1px 0px 5px 1px rgba(0,0,0,0.2);
   @media(max-width: 1000px){
          padding: 0 20px;
          
      }
`;

export const Container = styled.div`
  height: 60px;
  width: 100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color: ${props => props.theme.colors.text};
`;
export const Title = styled.h1`
  @media(max-width: 600px){
          font-size:18px;
          
      }
`;

export const ThemeTogglerBox = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  cursor: pointer;
  
`;
export const ThemeLabel = styled.label`
  
  margin-left:10px;
  cursor: pointer;
  
`;