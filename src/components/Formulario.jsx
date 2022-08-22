
import { useState,useEffect} from "react"
import Error from "./Error"
<script src="https://kit.fontawesome.com/692e08e21d.js" crossorigin="anonymous"></script>

function Formulario({pacientes,setPacientes,paciente,setPaciente}) {

  const [nombre, setNombre] = useState ('')
  const [propietario, setPropietario] = useState ('')
  const [email, setEmail] = useState ('')
  const [alta, setAlta] = useState ('')
  const [sintomas, setSintomas] = useState ('')


  const [error,setError] = useState(false)

  /* useEffect(()=> {
    console.log(paciente)
  }, [paciente])  Que se ejecute el console log solo cuando paciente cambie
 

  El siguiente tiene las dependencias vacias, asi que cuando se actualice el componente que lo llama (En este caso formulario, se ejecuta)
  useEffect (()=> {}{
    
  },[])
 */

  useEffect(()=> {
   if( Object.keys(paciente).length > 0){ //Con esto cargo la informacion del paciente a editar en los campos del form
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setAlta(paciente.alta)
      setSintomas(paciente.sintomas)
   }
  }, [paciente])

  const handleSubmit = (e) =>{
    //Validación del formulario
    e.preventDefault()
    if([nombre,propietario,email,alta,sintomas].includes('')){
      console.log("Hay al menos un campo vacío")
      setError(true)
      return
    }
    setError(false)
    //objeto de paciente
    
    const generarId = () => {
      const random = Math.random().toString(36).substr(2);
      const fecha = Date.now().toString(36)

      return random+fecha;
    }

    const objetoPaciente= {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }


    if(paciente.id){
      //Estoy editando
      objetoPaciente.id = paciente.id

      const pacientesActualizados= pacientes.map(pacienteState => 
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
        // Con esto cargue en el array de pacientes el nuevo paciente actualizado, el resto los deje igual
        setPacientes(pacientesActualizados)
        setPaciente({}) //vacio denuevo el paciente en el state
    }
    else{
      //Estoy creando un nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes,objetoPaciente])
    }
      
      //Reiniciar el form
      setNombre('')
      setPropietario('')
      setEmail('')
      setAlta('')
      setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-3">

        <h2 className="font-black text-3xl text-center"> 
           Seguimiento pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
            Añade pacientes y {""}
            <span className="text-indigo-600 font-bold "> Administralos</span>
        </p>
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg py-10 px-5">

         {error && <Error> <p>Todos los campos deben estar completos</p> </Error>  /*Si hay error pone el div */} 

         <div className="mb-5">
            <label htmlFor="mascota"
                className="block font-bold text-gray-700 "> 
                Nombre de tu mascota
            </label>
            <input 
              id="mascota"
              className="border-5 w-full p-2 mt-2 placeholderbg-gray-500 rounded-md" 
              type="text" 
              placeholder="Nombre de la mascota"
              value={nombre}
              onChange={ (e) => setNombre(e.target.value)}
            />
      </div>

      
      <div className="mb-5">
        <label htmlFor="propietario"
          className="block font-bold text-gray-700 "> 
          Nombre del propietario
        </label>
        <input 
        id="propietario"
        className="border-5 w-full p-2 mt-2 placeholderbg-gray-500 rounded-md" 
        type="text" 
        placeholder="Nombre del propietario"
        value={propietario}
        onChange={ (e) => setPropietario(e.target.value)}
        />
      </div>


      <div className="mb-5">
        <label htmlFor="email"
          className="block font-bold text-gray-700 "> 
          Email
        </label>
        <input 
        id="email"
        className="border-5 w-full p-2 mt-2 placeholderbg-gray-500 rounded-md" 
        type="email" 
        placeholder="Email contacto"
        value={email}
        onChange={ (e) => setEmail(e.target.value)}
        />
      </div>


      <div className="mb-5">
        <label htmlFor="alta"
          className="block font-bold text-gray-700 "> 
          Alta
        </label>
        <input 
        id="alta"
        className="border-5 w-full p-2 mt-2 placeholderbg-gray-500 rounded-md" 
        type="date" 
        value={alta}
        onChange={ (e) => setAlta(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="sintomas"
          className="block font-bold text-gray-700 "> 
          Sintomas
        </label>
      <textarea 
         id="sintomas"  
         className="border-5 w-full p-2 mt-2 placeholderbg-gray-500 rounded-md"  
         placeholder="Describe los sintomas de la mascota"
         value={sintomas}
         onChange={ (e) => setSintomas(e.target.value)}
         > Describe los sintomas de la mascota 
         </textarea> 
        
    </div>
     
    <input 
      type="submit"
      className="bg-indigo-600 w-full p-3 text-white rounded-xl hover:bg-indigo-700 hover:scale-105 transition-all"
      value= {paciente.id
        ? 'Editar Paciente'
        : 'Agregar Paciente'}
    ></input>
    </form>
    </div>
  )
}

export default Formulario