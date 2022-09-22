import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Header,
  Titulo,
  ContenedorHeader,
  ContenedorBotones,
} from './elementos/Header';
import Boton from './elementos/Boton';
import BotonCerrarSesion from './elementos/BotonCerrarSesion';
import FormularioGastos from './componentes/FormularioGastos';
import BarraTotalGastado from './componentes/BarraTotalGastado';

const App = () => {

 


  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
        <Header>
          <ContenedorHeader>
            <Titulo>Agregar Gasto</Titulo>
            <ContenedorBotones>
              <Boton to="/categorias" title="Gastos por Categorias">
                Categorias
              </Boton>
              <Boton to="/lista" title="Lista de Gastos">
                Gastos
              </Boton>
              <BotonCerrarSesion />
            </ContenedorBotones>
          </ContenedorHeader>
        </Header>

        <FormularioGastos />

        <BarraTotalGastado />
    </>
  );
};

export default App;
