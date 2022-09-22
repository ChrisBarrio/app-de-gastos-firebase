import React, { useState, useEffect } from 'react';
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from '../elementos/ElementosDeFormularios';
import Boton from '../elementos/Boton';
import { ReactComponent as IconoPlus } from '../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { useAuth } from '../contextos/AuthContext';
import Alerta from '../elementos/Alerta';
import { useNavigate } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';
import Swal from "sweetalert2";

const FormularioGastos = ({ gasto }) => {
  const [inputDescripcion, cambiarInputDescripcion] = useState('');
  const [inputCantidad, cambiarInputCantidad] = useState('');
  const [categoria, cambiarCategoria] = useState('HOGAR');
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  //obtenemos el uid
  const { usuario } = useAuth();
  const navigate = useNavigate();
  

  // use Effect que trae datos a editar.
  useEffect(() => {
    //comprobamos si hay algun gasto
    // de ser asi establecemos todo el state con los valores del gasto.
    if (gasto) {
      //comprobamos que el gasto sea del usuario actual.
      //para eso comprobamos el 'uid' guardado en el gasto con el 'uid' del usuario.
      if (gasto.data().uidUsuario === usuario.uid) {
        console.log(gasto.data())
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha))
        cambiarInputCantidad(gasto.data().cantidad)
        cambiarInputDescripcion(gasto.data().descripcion)
      }else{
        navigate('/lista');
      }
    }
  }, [gasto, usuario, navigate]);

  //cambio en el inpu
  const handleChange = (e) => {
    if (e.target.name === 'descripcion') {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === 'cantidad') {
      cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
    }
  };
  //cambio en el submit al enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    let cantidad = parseFloat(inputCantidad).toFixed(2);

    //comprobamos que haya una descripcion y valor

    if (inputDescripcion !== '' && inputCantidad !== '') {
      if (cantidad) {
        if (gasto) {
          editarGasto({
            id:gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha)
          })
          .then(() =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Gasto editado',
              showConfirmButton: false,
              timer: 2000
            })
            navigate('/lista')
          }).catch((error) => {
            console.log(error)
          })
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid,
          })
            //cuando los valores de arriba son correctos entonces(then) reinicio formulario
            .then(() => {
              cambiarCategoria('Hogar');
              cambiarInputDescripcion('');
              cambiarInputCantidad('');
              cambiarFecha(new Date());
  
              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: 'exito',
                mensaje: 'Agregado con éxito.',
              }).catch((error) => {
                console.log(error);
              });
            });
        }
      
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: 'error',
          mensaje: 'El valor que ingresaste no es correcto.',
        });
      }
    } else {
      console.log('Debe ingresar los datos.');
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor rellena todos los campos.',
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
      </ContenedorFiltros>

      <div>
        <Input
          type="text"
          name="descripcion"
          placeholder="Descripcion del gasto"
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          placeholder="$0.00"
          value={inputCantidad}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario conIcono type="submit">
            {gasto ? 'Editar Gasto' : 'Agregar Gasto'}
            <IconoPlus />
          </Boton>
        </ContenedorBoton>
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          estadoAlerta={estadoAlerta}
          cambiarEstadoAlerta={cambiarEstadoAlerta}
        />
      </div>
    </Formulario>
  );
};

export default FormularioGastos;
