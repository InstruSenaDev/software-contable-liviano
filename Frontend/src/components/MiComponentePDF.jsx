import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from './PDF';

const MiComponentePDF = () => {
  const [data, setData] = useState([]);
  const [dataInforme, setDataInforme] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fechaHora, setFechaHora] = useState({ fecha: '', hora: '' });
  const [nombreRegistrador, setNombreRegistrador] = useState('Desconocido'); // Nuevo estado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://provisoft-backend.vercel.app/obtenerDatosInforme');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || 'Error del servidor');
        }
        
        const result = await response.json();
        console.log("Datos obtenidos:", result);
        setData(result);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filterDate !== null) {
      getInformData();
    }
  }, [filterDate]);

  const getInformData = async () => {
    try {
      const response = await fetch('https://provisoft-backend.vercel.app/obtenerDatosInformePorFecha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fechaDatos: filterDate }),
      });
      const data = await response.json();
      setDataInforme(data);
    } catch (error) {
      console.error('Error al obtener datos del informe:', error);
    }
  };

  // Obtener nombre, fecha y hora actual
  useEffect(() => {
    const updateFechaHora = () => {
      const fechaActual = new Date();
      const fecha = fechaActual.toLocaleDateString();
      const hora = fechaActual.toLocaleTimeString();

      setFechaHora({ fecha, hora });

      // Asignar nombre desde localStorage
      const nombre = localStorage.getItem('user_name') || 'Desconocido';
      setNombreRegistrador(nombre); // Almacenar el nombre en el estado
    };

    updateFechaHora();
    const intervalId = setInterval(updateFechaHora, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-baby4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold">Información</p>
        <p>No hay datos disponibles para el informe.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <span className="flex flex-row ">
        <div className="mt-4 p-5">
          <button
            type="button"
            id="volver"
            className="bg-blue-baby4 text-white p-2 rounded hover:bg-blue-baby3"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      </span>

      <div className="bg-gray-200 rounded-sm flex flex-row justify-around p-5">
        <span className="flex flex-row">
          <p className="m-1">Registrador:</p>
          <p className="m-1">{nombreRegistrador}</p> {/* Mostrar nombre desde el estado */}
        </span>
        <span className="flex flex-row">
          <p className="m-1">Hora:</p>
          <p className="m-1">{fechaHora.hora}</p>
        </span>
        <span className="flex flex-row">
          <p className="m-1">Fecha:</p>
          <p className="m-1">{fechaHora.fecha}</p>
        </span>
      </div>

      <h2 className="text-3xl font-display text-blue-baby4 font-bold mb-8 text-center">Generación de Informes</h2>
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Seleccionar Fecha</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-80">
            <input
              type="date"
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-baby4 transition duration-300 ease-in-out"
            />
          </div>
          <PDFDownloadLink document={<PDF data={dataInforme} />} fileName="informeCompra.pdf">
            <button 
              className="w-full sm:w-auto bg-blue-baby4 text-white p-3 rounded-lg hover:bg-blue-baby3 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={dataInforme === null}
            >
              Informe por fecha
            </button>
          </PDFDownloadLink>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Informe completo</h3>
        <PDFDownloadLink document={<PDF data={data} />} fileName="informeCompra.pdf">
          {({ loading }) => (
            <button className="w-full bg-blue-baby4 text-white p-3 rounded-lg hover:bg-blue-baby3 transition duration-300 ease-in-out flex items-center justify-center">
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
              ) : null}
              {loading ? 'Generando PDF...' : 'Descargar Informe Completo'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default MiComponentePDF;
