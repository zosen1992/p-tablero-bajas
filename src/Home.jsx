import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://localhost:7231/api/NuEt"

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold underline">Ventana Principal</h1>
      
      <Link to="/second">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow">Ir a Segunda Ventana</button>
      </Link>
    </div>
    
    <h1>Lista de Posts</h1>
      {loading ? <p>Cargando...</p> : 
        <ul>
          {data.map((post) => (
            <li key={post.cuenta}>{post.nombre}</li>
          ))}
        </ul>
      }
    </div>
  );
};









 
export default Home;
