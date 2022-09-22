import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from '../elementos/Header';
import Boton from '../elementos/Boton';
import {
  Formulario,
  Input,
  ContenedorBoton,
} from '../elementos/ElementosDeFormularios';
import {ReactComponent as login} from '../imagenes/login.svg'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alerta from '../elementos/Alerta';


const LoginSvg = styled(login)`
  width:100%;
  max-height:10rem;
  // margin-bottom:1.25rem;
`;

const InicioSesion = () => {
  let navigate = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if(e.target.name === 'email'){
      establecerCorreo(e.target.value);
    }else if (e.target.name === 'password') {
    establecerPassword(e.target.value);
    }
  }

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
    if (correo === '' || password === '') {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor debe completar todos los datos.',
      });
      return;
    }

    //cuando hayan pasado los condicionales de arriba se crea el user
    try {
      await signInWithEmailAndPassword(auth, correo, password);
      console.log('Inicio de sesión exitoso.');
      navigate('/');
    } catch (error) {
      cambiarEstadoAlerta(true);

      let mensaje;
      switch (error.code) {
        case 'auth/wrong-password':
          mensaje='La contraseña es invalida.'
          break;
        case 'auth/user-not-found':
          mensaje='El email es incorrecto.'
          break;
        case 'auth/user-disabled':
          mensaje='Su cuenta fue inhabilitada. Comuniquese con su administrador.'
          break;
        default:
          mensaje = 'Hubo un error al intentar iniciar sesión.';
        break;
      }
      // console.log(error.code)
      cambiarAlerta({ tipo: 'error', mensaje: mensaje });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta">Crear Cuenta</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <LoginSvg />
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
        <ContenedorBoton>
          <Boton primario as='button' type='submit'>Iniciar Sesion</Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta 
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  )
}

export default InicioSesion