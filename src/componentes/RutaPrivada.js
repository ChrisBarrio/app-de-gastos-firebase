import React from 'react';
import {useAuth} from '../contextos/AuthContext';
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({children}) => {
  const {usuario} = useAuth();

  // si hay usuario devuelve el children(la ruta), sino, redirecciona para que inicie sesion.
  
  if (usuario) {
    return children;
  } else {
    return <Navigate replace to='/iniciar-sesion' />
  }
}

export default RutaPrivada