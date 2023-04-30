import { useState } from "react";


export default function Formulario() {
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmacion, setConfirmacion] = useState("");
    const [terminos, setTerminos] = useState(false);

    const handleSubmit= e => {
        e.preventDefault();
        alert("Has creado una cuenta correctamente")
    }
    return (
        <>
        <h2> Por favor, ingresa los siguientes datos para crear tu cuenta en Nomadapp</h2>
        <form onSubmit={handleSubmit}>
            <input
             type="text"
              id="usuario" 
              value={usuario}
              onchange={(e) => setUsuario(e.target.value)}
              defaultValue="Usuario"
              />
              <label htmlFor="correo"></label>
            <input
             type="text"
              id="correo" 
              name="correo"
              value={correo}
              onchange={(e) => setCorreo(e.target.value)}
              defaultValue="correo Electrónico"
              />
               <input
             type="text"
              id="contraseña" 
              name="contraseña"
              value={contraseña}
              onchange={(e) => setContraseña(e.target.value)}
              defaultValue="contraseña"
              />
              <input
             type="text"
              id="confirmarcontraseña" 
              name="confirmarcontraseña"
              value={confirmacion}
              onchange={(e) => setConfirmacion(e.target.value)}
              defaultValue="confirmar contraseña"
              />
              <br/>
              <label htmlFor="terminos"> He leído y acepto los términos y condiciones</label>
              <input 
              type="checkbox"
              value={terminos}
              id="terminos"
              name="terminos"
              onChange={(e) => setTerminos(e.target.checked)}
              />
              <input type="submit"/>
              
        </form>
        </>
    )
}