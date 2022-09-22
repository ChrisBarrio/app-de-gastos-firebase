import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Img404 from '../imagenes/error-404.svg';
import Boton from '../elementos/Boton';

const Error404 = () => {
  return (
    <>
      <Helmet>
        <title>Pagina no encontrada</title>
      </Helmet>
      <Contenedor404>
        <Img src={Img404} alt="error-404" />
        <Parrafo>Página no encontrada.</Parrafo>
        <Boton to='/'>Volver a Inicio</Boton>
      </Contenedor404>
    </>
  );
};
const Img = styled.img`
  width: 25rem;
  margin:0 0 5rem 0;
  `;
  
  const Contenedor404 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;
  const Parrafo = styled.p`
  font-size:18px;
  font-weight:bold;
  margin:0 0 5rem 0;
  text-transform:uppercase;
`;

export default Error404;
