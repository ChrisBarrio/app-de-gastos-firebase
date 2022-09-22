import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';
import styled from 'styled-components';
import theme from '../theme';

const DatePicker = ({ fecha, cambiarFecha }) => {
  const [visible, cambiarVisible] = useState(false);

  //funcion que establece la fecha
  const formaFecha = (fecha = new Date()) => {
    return format(fecha, `dd 'de' MMM 'de' yyyy`, { locale: es });
  };

  const ContenedorInput = styled.div`
    position: relative;

    input {
      font-family: 'Work Sans', sans-serif;
      box-sizing: border-box;
      background: ${theme.grisClaro};
      border: none;
      cursor: pointer;
      border-radius: 0.625rem; /* 10px */
      height: 5rem; /* 80px */
      width: 100%;
      padding: 0 1.25rem; /* 20px */
      font-size: 1.5rem; /* 24px */
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
    }
    //reglas de react date picker
    .rdp {
      position: absolute;
      right:-10px;
    }

    .rdp-months {
      display: flex;
      justify-content: center;
    }

    .rdp-month {
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      padding: 20px;
      border-radius: 10px;
    }

    @media (max-width: 60rem) {
      /* 950px */
      & > * {
        width: 100%;
      }
    }
  `;
    
  return (
    <ContenedorInput
      onClick={() => {
        cambiarVisible(!visible);
      }}
    >
      <input type="text" readOnly value={formaFecha(fecha)} />
      {visible && (
        <DayPicker
          mode="single"
          onSelect={cambiarFecha} //funcion cambiar fecha
          selected={fecha} //fecha seleccionada
          locale={es}
        />
      )}
    </ContenedorInput>
  );
};

export default DatePicker;
