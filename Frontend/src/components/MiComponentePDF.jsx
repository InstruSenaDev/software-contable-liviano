import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from './PDF'; 

const estilobtn = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
};

const MiComponentePDF = () => {
  const [data, setData] = useState([]);
  const [dataInforme, setDataInforme] = useState(null)
  const [filterDate, setFilterDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  useEffect(()=>{
    if(filterDate === null){

    }else{
      getInformData()
    }
  },[filterDate])
  const getInformData = async () =>{
    try {
      const response = await fetch('https://provisoft-backend.vercel.app/obtenerDatosInformePorFecha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ fechaDatos: filterDate}), // Convierte el objeto a JSON
      });
      const data = await response.json();
      setDataInforme(data)
    } catch (error) {
      
    }
  }

  if (isLoading) {
    return <button style={estilobtn}>Cargando datos del informe...</button>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No hay datos disponibles para el informe.</div>;
  }

  return ( <div className='flex flex-row gap-2'><input type="date" name="" id="" onChange={(e)=>{setFilterDate(e.target.value), console.log(filterDate)}} />
    {/* <button onClick={()=>getInformData()}>Obtener datos de informe</button> */}
    <PDFDownloadLink document={<PDF data={data} />} fileName="informeCompra.pdf">
      {({ loading }) =>
        loading ? (
          <button style={estilobtn}>Generando PDF con cuentas...</button>
        ) : (
          <button style={estilobtn}>Informe Completo</button>
        )
      }
    </PDFDownloadLink>
    
      <PDFDownloadLink document={<PDF data={dataInforme} />} fileName="informeCompra.pdf">
      <button className='bg-blue-baby4  text-white p-2 rounded' disabled={ dataInforme === null ? true: false} > Informe Por Fecha</button>
    </PDFDownloadLink>
    
    </div>
  );
};

export default MiComponentePDF;
