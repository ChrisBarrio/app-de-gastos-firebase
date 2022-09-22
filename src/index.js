import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Contenedor from './elementos/Contenedor';
import InicioSesion from './componentes/InicioSesion';
import RegistroUsuarios from './componentes/RegistrosUsuarios';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import ListaDeGastos from './componentes/ListaDeGastos';
import EditarGasto from './componentes/EditarGasto';
import Error404 from './componentes/Error404';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './contextos/totalGastadoEnElMesContext';

// Fonts
WebFont.load({
  google: {
    families: ['Work Sans:400, 500, 700', 'sans-Serif'],
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Helmet>
      <link rel="shorcut icon" href={favicon} type="image/x-icon" />
      <title>App Gastos</title>
    </Helmet>
    <AuthProvider>
      <TotalGastadoProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="*" element={<Error404 />} />
              <Route path="/iniciar-sesion" element={<InicioSesion />} />
              <Route path="/crear-cuenta" element={<RegistroUsuarios />} />

              <Route
                path="/categorias"
                element={
                  <RutaPrivada>
                    <GastosPorCategoria />
                  </RutaPrivada>
                }
              />
              <Route
                path="/lista"
                element={
                  <RutaPrivada>
                    <ListaDeGastos />
                  </RutaPrivada>
                }
              />
              <Route
                path="/editar/:id"
                element={
                  <RutaPrivada>
                    <EditarGasto />
                  </RutaPrivada>
                }
              />
              <Route
                path="/"
                element={
                  <RutaPrivada>
                    <App />
                  </RutaPrivada>
                }
              />
            </Routes>
          </Contenedor>
        </BrowserRouter>
      </TotalGastadoProvider>
    </AuthProvider>

    <Fondo />
  </>
);
