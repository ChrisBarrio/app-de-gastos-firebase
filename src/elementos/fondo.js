import React from "react";
import styled from "styled-components";
import {ReactComponent as Mobile} from '../imagenes/notification_illustration_1.svg'
import {ReactComponent as Points} from '../imagenes/puntos.svg'

const Svg = styled.svg`
	height: 50vh;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 0;
	path {
		fill: rgba(135,182,194, .15);
	}
`;

const PuntosArriba = styled(Points)`
	position: fixed;
    width:15rem;
	z-index: 1;
	top: 2.5rem; /* 40px */
	left: 5rem; /* 40px */
	border-radius: 60% 40% 70% 30% / 47% 58% 42% 73%;
	animation: rotate 5s infinite;
	@keyframes rotate {
		from { transform: rotate(0deg); }
    	to { transform: rotate(360deg); }
	}
    `;
    
    const PuntosAbajo = styled(Mobile)`
	position: fixed;
    width:20rem;
	z-index: 1;
	bottom: 2.5rem; /* 40px */
	right: 2.5rem; /* 40px */
`;


const Fondo = () => {
  return (
    <>
        <PuntosArriba />
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path  fillOpacity="1" d="M0,128L60,138.7C120,149,240,171,360,197.3C480,224,600,256,720,240C840,224,960,160,1080,122.7C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></Svg>
        <PuntosAbajo />
    </>
  )
}

export default Fondo
