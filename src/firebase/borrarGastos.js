import { db } from "./firebaseConfig"
import { doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const borrarGastos = (id) => {
  
// sweetalert2  
  Swal.fire({
    title: 'Estas segur@?',
    text: "No podrás revertirlo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    
  }).then(async(result) => {
    if (result.isConfirmed) {
      //funcion de eliminar
      await deleteDoc(doc(db, 'gastos', id))
      Swal.fire(
        'Eliminado!',
        'Tu gasto se ha eliminado.',
        'success'
      )
    }
  })
}

export default borrarGastos
