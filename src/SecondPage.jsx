/*import { useEffect, useState } from "react";
import "./SecondPage.css";

const SecondPage = () => {
  const [data, setData] = useState([]);
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRowData, setNewRowData] = useState({
    cuenta: "",
    nombre: "",
    fecha: "",
    alert: "N/A",
    weblab: "N/A",
    emodata: "N/A",
    sisLab: "N/A",
    winLab: "N/A",
    winLab_Web: "N/A",
    pathox: "N/A",
    onBase: "N/A",
    farhos: "N/A",
    ris: "N/A",
    pacs: "N/A",
    radPrimer: "N/A",
    statDx_u: "N/A",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({
      ...newRowData,
      [name]: value,
    });
  };

  const handleAddRow = () => {
    setShowNewRow(true);
  };

  const handleSaveRow = () => {
    setData([...data, newRowData]);
    setShowNewRow(false);
    setNewRowData({
      cuenta: "",
      nombre: "",
      fecha: "",
      alert: "N/A",
      weblab: "N/A",
      emodata: "N/A",
      sisLab: "N/A",
      winLab: "N/A",
      winLab_Web: "N/A",
      pathox: "N/A",
      onBase: "N/A",
      farhos: "N/A",
      ris: "N/A",
      pacs: "N/A",
      radPrimer: "N/A",
      statDx_u: "N/A",
    });
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
                <td>{item.nombre}</td>
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
                <td><input type="text" name="cuenta" value={newRowData.cuenta} onChange={handleInputChange} /></td>
                <td><input type="text" name="nombre" value={newRowData.nombre} disabled /></td>
                <td><input type="text" name="fecha" value={newRowData.fecha} disabled /></td>
                {["alert", "weblab", "emodata", "sisLab", "winLab", "winLab_Web", "pathox", "onBase", "farhos", "ris", "pacs", "radPrimer", "statDx_u"].map(field => (
                  <td key={field}>
                    <select name={field} value={newRowData[field]} onChange={handleInputChange}>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                      <option value="N/A">N/A</option>
                    </select>
                  </td>
                ))}
                <td><button onClick={handleSaveRow}>Guardar</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddRow}>Agregar Nueva Línea</button>
    </div>
  );
};

export default SecondPage;
*/

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
        const fetchData = async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error en la respuesta de la API");
            const result = await response.json();
            return result.length > 0 ? result[0] : null;
          } catch (error) {
            console.error(`Error al obtener datos de ${url}:`, error);
            return null;
          }
        };
  
        const urls = {
          weblab: `https://localhost:7231/api/Weblab/nomina?nomina=${cuenta}`,
          alert: `https://localhost:7231/api/Alert/nomina2?nomina=${cuenta}`,
          emodata: `https://localhost:7231/api/Emodata/nominaemo?nomina=${cuenta}`,
          farhos: `https://localhost:7231/api/Farhos/nominafa?nomina=${cuenta}`,
          onBase: `https://localhost:7231/api/OnBase/nominaob?nomina=${cuenta}`,
          pacs: `https://localhost:7231/api/Pacs/nominapacs?nomina=${cuenta}`,
          pathox: `https://localhost:7231/api/Pathox/nominapathox?nomina=${cuenta}`,
          ris: `https://localhost:7231/api/Ris/nominaris?nomina=${cuenta}`,
          sisLab: `https://localhost:7231/api/Sislab/nominasislab?nomina=${cuenta}`,
          winLab_Web: `https://localhost:7231/api/Winlabw/nominaww?nomina=${cuenta}`,
        };
  
        const results = await Promise.all(Object.entries(urls).map(([key, url]) => fetchData(url)));
  
        // Determinar cuál API devuelve el nombre completo
        const firstValidResult = results.find(res => res?.nombreCompleto);
  
        const dataFetched = Object.keys(urls).reduce((acc, key, index) => {
          acc[key] = results[index]?.estatusPerfil || "N/A";
          return acc;
        }, {});
  
        setNewRowData({
          ...newRowData,
          nombre: firstValidResult?.nombreCompleto || "N/A",
          fecha: firstValidResult?.fechaCreacion || "N/A",
          ...dataFetched,
          winLab: "N/A",
          radPrimer: "N/A",
          statDx_u: "N/A",
        });
  
        setMessage(`Información cargada para la cuenta: ${cuenta}`);
      } catch (error) {
        console.error("Error general en la búsqueda:", error);
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