import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from '../elementos/Header';
import Boton from '../elementos/Boton';
import {
  Formulario,
  Input,
  ContenedorBoton,
} from '../elementos/ElementosDeFormularios';
import { ReactComponent as createAnAccount } from '../imagenes/create-account.svg';
import styled from 'styled-components';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Alerta from '../elementos/Alerta';
const CreateAccountSvg = styled(createAnAccount)`
  width: 100%;
  max-height: 10rem;
  // margin-bottom:1.25rem;
`;

const RegistrosUsuarios = () => {
  let navigate = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [password2, establecerPassword2] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  //obtenemos datos
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        establecerCorreo(e.target.value);
        break;
      case 'password':
        establecerPassword(e.target.value);
        break;
      case 'password2':
        establecerPassword2(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor ingrese un email válido.',
      });
      return;
    }
    if (correo === '' || password === '' || password2 === '') {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor debe completar todos los datos.',
      });
      return;
    }
    if (password !== password2) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor la contraseña de verificación no coincide.',
      });
      return;
    }

    //cuando hayan pasado los condicionales de arriba se crea el user
    try {
      await createUserWithEmailAndPassword(auth, correo, password);
      console.log('El usuario se creo con exito.');
      navigate('/');
    } catch (error) {
      cambiarEstadoAlerta(true);

      let mensaje;
      switch (error.code) {
        case 'auth/invalid-password':
          mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.';
          break;
        case 'auth/email-already-in-use':
          mensaje =
            'Ya existe una cuenta con el correo electrónico proporcionado.';
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido.';
          break;
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.';
          break;
      }
      cambiarAlerta({ tipo: 'error', mensaje: mensaje });
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <CreateAccountSvg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          title="Ingrese correo"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contrasena"
          title="Ingrese contrasena"
          value={password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Repetir Contrasena"
          title="Ingrese contrasena nuevamente"
          value={password2}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton primario as="button" type="submit">
            Crear Cuenta
          </Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
};

export default RegistrosUsuarios;
