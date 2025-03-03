import { useEffect, useState } from "react";
import "./SecondPage.css";

const SecondPage = () => {
  const [data, setData] = useState([]);
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRowData, setNewRowData] = useState({
    cuenta: "",
    nombre: "",
    fecha: "",
    alert: "",
    weblab: "",
    emodata: "",
    sisLab: "",
    winLab: "",
    winLab_Web: "",
    pathox: "",
    onBase: "",
    farhos: "",
    ris: "",
    pacs: "",
    radPrimer: "",
    statDx_u: "",
  });
  const [message, setMessage] = useState(""); // Estado para el mensaje

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7231/api/users");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({
      ...newRowData,
      [name]: value,
    });
  };

  const handleAddRow = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    setNewRowData({
      ...newRowData,
      fecha: formattedDate,
    });
    setShowNewRow(true);
  };

  const handleSaveRow = () => {
    setData([...data, newRowData]);
    setShowNewRow(false);
    setNewRowData({
      cuenta: "",
      nombre: "",
      fecha: "",
      alert: "",
      weblab: "",
      emodata: "",
      sisLab: "",
      winLab: "",
      winLab_Web: "",
      pathox: "",
      onBase: "",
      farhos: "",
      ris: "",
      pacs: "",
      radPrimer: "",
      statDx_u: "",
    });
  };

  // Función para manejar la tecla Enter en el campo "Cuenta"
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const cuenta = newRowData.cuenta;
      setMessage(`Buscando información para la cuenta: ${cuenta}`);
      
      try {
        // Realizar la solicitud a la API
        const response = await fetch(
          `https://localhost:7231/api/Weblab/nomina?nomina=${cuenta}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const result = await response.json();

        // Validar que la respuesta no sea undefined y que sea un arreglo con al menos un elemento
        if (!result || !Array.isArray(result) || result.length === 0) {
          throw new Error("La respuesta de la API está vacía o no es válida");
        }
  
          // Realizar la solicitud a la API
          const response2 = await fetch(
            `https://localhost:7231/api/Alert/nomina2?nomina=${cuenta}`
          );
          if (!response2.ok) {
            throw new Error("Error al obtener los datos");
          }
          const result2 = await response2.json();
          
          // Validar que la respuesta no sea undefined y que sea un arreglo con al menos un elemento
          if (!result2 || !Array.isArray(result2) || result2.length === 0) {
            throw new Error("La respuesta de la API está vacía o no es válida");
          }
        // Obtener el primer elemento del arreglo
        const datos = result[0];
        const datos2 = result2[0];
        console.log(datos.estatusPerfil);
        console.log(datos2.estatusPerfil);
  
        // Actualizar el estado con los datos recibidos
        
        
      setNewRowData({
        ...newRowData,
        nombre: datos.nombreCompleto || "", // Usar el campo correcto
        fecha: datos.fechaCreacion || "", // Usar el campo correcto
        alert: datos.estatusPerfil || "", // Usar el campo correcto
        weblab: datos2.estatusPerfil || "", // Ejemplo de campo booleano
        emodata: "N/A", // Si no hay dato, dejar vacío
        sisLab: "N/A", // Si no hay dato, dejar vacío
        winLab: "N/A", // Si no hay dato, dejar vacío
        winLab_Web: "N/A", // Si no hay dato, dejar vacío
        pathox: "N/A", // Si no hay dato, dejar vacío
        onBase: "N/A", // Si no hay dato, dejar vacío
        farhos: "N/A", // Ejemplo de campo booleano
        ris: "N/A", // Si no hay dato, dejar vacío
        pacs: "N/A", // Si no hay dato, dejar vacío
        radPrimer: "N/A", // Si no hay dato, dejar vacío
        statDx_u: "N/A", // Si no hay dato, dejar vacío
      });

      setMessage(`Información cargada para la cuenta: ${cuenta}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage(`Error al buscar la cuenta: ${cuenta}`);
    }
  }
};


  return (
    <div className="container">
      <h1>Tabla de Datos</h1>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Nombre completo</th>
              <th>Fecha baja</th>
              <th>Alert</th>
              <th>Weblab</th>
              <th>Emodata</th>
              <th>SisLab</th>
              <th>WinLab</th>
              <th>WinLab-Web</th>
              <th>Pathox</th>
              <th>OnBase</th>
              <th>Farhos</th>
              <th>RIS</th>
              <th>PACS</th>
              <th>RadPrimer</th>
              <th>StatDx</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.cuenta}</td>
                <td className="nombre-completo-cell">{item.nombre}</td>
                <td>{item.fecha}</td>
                <td>{item.alert}</td>
                <td>{item.weblab}</td>
                <td>{item.emodata}</td>
                <td>{item.sisLab}</td>
                <td>{item.winLab}</td>
                <td>{item.winLab_Web}</td>
                <td>{item.pathox}</td>
                <td>{item.onBase}</td>
                <td>{item.farhos}</td>
                <td>{item.ris}</td>
                <td>{item.pacs}</td>
                <td>{item.radPrimer}</td>
                <td>{item.statDx_u}</td>
                <td></td>
              </tr>
            ))}
            {showNewRow && (
              <tr>
                <td>
                  <input
                    type="text"
                    name="cuenta"
                    value={newRowData.cuenta}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Manejador de tecla Enter
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="nombre"
                    value={newRowData.nombre}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="fecha"
                    value={newRowData.fecha}
                    onChange={handleInputChange}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="alert"
                    value={newRowData.alert}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="weblab"
                    value={newRowData.weblab}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="emodata"
                    value={newRowData.emodata}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="sisLab"
                    value={newRowData.sisLab}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="winLab"
                    value={newRowData.winLab}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="winLab_Web"
                    value={newRowData.winLab_Web}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="pathox"
                    value={newRowData.pathox}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="onBase"
                    value={newRowData.onBase}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="farhos"
                    value={newRowData.farhos}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="ris"
                    value={newRowData.ris}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="pacs"
                    value={newRowData.pacs}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="radPrimer"
                    value={newRowData.radPrimer}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="statDx_u"
                    value={newRowData.statDx_u}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button onClick={handleSaveRow}>Guardar</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddRow}>Agregar Nueva Línea</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SecondPage;