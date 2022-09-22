import React from 'react';
import { ReactComponent as IconoCerrarSesion } from '../imagenes/log-out.svg';
import Boton from './Boton';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const BotonCerrarSesion = () => {
  const navigate = useNavigate();

  // funcion cerrar sesion.
  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate('/iniciar-sesion');
      console.log('Sesion finalizada con exito.')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Boton iconoGrande as="button" onClick={cerrarSesion}>
      <IconoCerrarSesion />
    </Boton>
  );
};

export default BotonCerrarSesion;
