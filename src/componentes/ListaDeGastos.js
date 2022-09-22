import React from 'react';
import { Header, Titulo, ContenedorHeader } from '../elementos/Header';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BtnRegresar from '../elementos/Btn-Regresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';
import {
  Lista,
  ElementoLista,
  // ListaDeCategorias,
  // ElementoListaCategorias,
  Categoria,
  Descripcion,
  Valor,
  // Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo,
  Fecha,
} from '../elementos/ElementoDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import convertirAMoneda from '../funciones/convertirAMoneda';
import { ReactComponent as IconoEditar } from '../imagenes/editar.svg';
import { ReactComponent as IconoBorrar } from '../imagenes/borrar.svg';
import Boton from '../elementos/Boton';
import { format, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';
import borrarGastos from '../firebase/borrarGastos';


const ListaDeGastos = () => {
  const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();
 
  //funcion que da formato y lenguaje 'Es' a la fecha.
  const formatearFecha = (fecha) => {
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {
      locale: es,
    });
  };

  // funcion que permite que no se repitan las fechas en la lista de gastos
  const fechaEsIgual = (gastos, index, gasto) => {
    if (index !== 0) {
      const fechaActual = formatearFecha(gasto.fecha);
      const fechaGastoAnterior = formatearFecha(gastos[index-1].fecha);

      if (fechaActual === fechaGastoAnterior) {
        return true
      } else {
        return false
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <BtnRegresar />
          <Titulo>Lista de Gastos</Titulo>
        </ContenedorHeader>
      </Header>

      <Lista>
        {gastos.map((gasto, index) => {
          return (
            <div key={gasto.id}>
              {!fechaEsIgual(gastos, index, gasto) && (
                <Fecha>{formatearFecha(gasto.fecha)}</Fecha>
              )}
              <ElementoLista key={gasto.id}>
                <Categoria>
                  <IconoCategoria id={gasto.categoria} />
                  {gasto.categoria}
                </Categoria>
                <Descripcion>{gasto.descripcion}</Descripcion>
                <Valor>{convertirAMoneda(gasto.cantidad)}</Valor>
                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                    <IconoEditar />
                  </BotonAccion>
                  <BotonAccion onClick={()=> borrarGastos(gasto.id)}>
                    <IconoBorrar />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}
        
        {hayMasPorCargar &&
        
          <ContenedorBotonCentral>
            <BotonCargarMas onClick={() => obtenerMasGastos() }>Ver más</BotonCargarMas>
          </ContenedorBotonCentral>
        }
        {/* si no hay nada que me muestre un mensaje para agrega gasto */}
        
        {gastos.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay gastos para mostrar.</Subtitulo>
            <Boton as={Link} to="/">
              Agregar Gasto
            </Boton>
          </ContenedorSubtitulo>
        )}
        
      </Lista>

      <BarraTotalGastado />
    </>
  );
};

export default ListaDeGastos;
