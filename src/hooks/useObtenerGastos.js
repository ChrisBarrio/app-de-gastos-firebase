import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contextos/AuthContext';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  startAfter
} from 'firebase/firestore';

const useObtenerGastos = () => {
	const {usuario} = useAuth();
	const [gastos, cambiarGastos] = useState([]);
	//establecemos un estado en el cual se deja el ultimo gasto.
	const [ultimoGasto, cambiarUltimoGasto] = useState(null);
	//nos permite saber si hay mas por cargar.
	const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

	//funcion que permite traer a la lista mas gastos
	const obtenerMasGastos = () => {
		const consulta = query(
			collection(db, 'gastos'),
			where('uidUsuario', '==', usuario.uid),
			orderBy('fecha', 'desc'),
			limit(10),
			startAfter(ultimoGasto)
		);

		onSnapshot(consulta, (snapshot) => {
			if(snapshot.docs.length > 0){
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
				//le concateno nueva infor a la existente
				cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
					return {...gasto.data(), id: gasto.id}
				})))
			} else {
				cambiarHayMasPorCargar(false);
			}
		}, error => {console.log(error)});
	}

	useEffect(() => {
		const consulta = query(
			collection(db, 'gastos'),
			where('uidUsuario', '==', usuario.uid),
			orderBy('fecha', 'desc'),
			limit(10)
		);

		const unsuscribe = onSnapshot(consulta, (snapshot) => {
			if(snapshot.docs.length > 0){
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
				cambiarHayMasPorCargar(true);
			} else {
				cambiarHayMasPorCargar(false);
			}
			
			cambiarGastos(snapshot.docs.map((gasto) => {
				return {...gasto.data(), id: gasto.id}
			}));
		});

		return unsuscribe;
	}, [usuario]);

	return [gastos, obtenerMasGastos, hayMasPorCargar];
}

export default useObtenerGastos;
