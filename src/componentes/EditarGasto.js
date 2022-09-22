import React from 'react'
import {
  Header,
  Titulo,
  ContenedorHeader,
} from '../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/Btn-Regresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGastos from './FormularioGastos';
import { useParams } from 'react-router-dom';
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {
  const {id} =useParams()
  const[gasto] = useObtenerGasto(id)



  return (
    <>
    <Helmet>
      <title>Editar Gasto</title>
    </Helmet>

    <Header>
      <ContenedorHeader>
        <BtnRegresar ruta='/lista'/>
        <Titulo>Editar Gasto</Titulo>
      </ContenedorHeader>
    </Header>
    
    <FormularioGastos gasto={gasto}/>

    <BarraTotalGastado />
  </>
  )
}

export default EditarGasto