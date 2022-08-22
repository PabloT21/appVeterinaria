import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import Formulario from './components/Formulario'
import Header from './components/Header' 
import ListadoPacientes from './components/ListadoPacientes'

function App() {
  const [pacientes,setPacientes] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("pacientes");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [paciente,setPaciente] = useState({});
 

 /* componentDidMount() {
    // Load localStorage data into state (if it exists)
    let data = JSON.parse(localStorage.getItem("pacientes"));
    if (data) {
      setPacientes(data);
    }
  }
  useEffect(()=> {
      const ObtenerlocalStorage= () => {
        const initialState = () => JSON.parse(localStorage.getItem("pacientes")) || [];
       const [pacientes, setPacientes] = useState(initialState);
      }
      ObtenerlocalStorage();
  },[]);  //Como no le paso dependencias, se ejecuta una unica vez
*/
  useEffect(()=>{
    localStorage.setItem('pacientes',JSON.stringify(pacientes)) //Porque en localstorage solo puedo guardar strings
  },[pacientes]) //Se lanza solo cuando hay un nuevo paciente

  const eliminarPaciente = (id) => {
      const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
      setPacientes(pacientesActualizados)
    }
  
  return (
    <div className="container mx-auto">
       <Header />
       <div className="mt-12 md:flex">
         <Formulario
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
         />
         <ListadoPacientes 
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
         />
       </div>
    </div>
  )
}

export default App
