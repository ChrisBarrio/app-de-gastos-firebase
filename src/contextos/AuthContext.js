import React,{useState, useContext, useEffect} from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


// creamos el contexto
const AuthContext = React.createContext();

//Hook para accerder al contexto
const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const[usuario,cambiarUsuario] = useState();
    //Creamos un state para saber cuando termina de cargar la comprobacion de onAuthStateChanged
    const[cargando,cambiarCargando] = useState(true);

    //effecto para ejecutar la comprobacion una sola vez
    useEffect(()=>{
        //comprobamos si hay un usuario
        const cancelarSuscripcion = onAuthStateChanged(auth ,(usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false)
        });

        return cancelarSuscripcion;
    },[])

    return(
        <AuthContext.Provider value={{usuario: usuario}}>
            {/* Solamente retornamos los elementos hijos cuando no este cargando.
            De esta forma nos aseguramos de no cargar el resto de la app hasta que el usuario haya iniciado sesion.*/}
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext, useAuth};