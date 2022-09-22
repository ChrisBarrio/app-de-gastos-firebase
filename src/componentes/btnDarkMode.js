import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../theme';
// 
const BtnDarkMode = () => {
  const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        let element = document.body;

        element.classList.toggle("dark");
        setIsClicked(isClicked => !isClicked);

    }



return(
    <DarkBoton onClick={handleClick}>
        
    </DarkBoton>
)
  
};

const DarkBoton = styled.button`
  scale:1.6;
  border:none;
  padding:.1rem;
  margin: 0 2rem;
  border-radius: 50%;
  background:${theme.colorSecundario};
`;

export default BtnDarkMode;
