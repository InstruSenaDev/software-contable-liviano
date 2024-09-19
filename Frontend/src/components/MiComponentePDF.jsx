import React, { useState, useEffect } from 'react';
import PDF from './PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const MiComponentePDF = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/obtenerDatosInforme');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const estilobtn = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  if (isLoading) {
    return <button style={estilobtn}>Cargando...</button>;
  }

  return (
    <PDFDownloadLink document={<PDF data={data} />} fileName="informeCompra.pdf">
      {({ loading }) =>
        loading ? (
          <button style={estilobtn}>Generando PDF...</button>
        ) : (
          <button style={estilobtn}>Descargar Informe</button>
        )
      }
    </PDFDownloadLink>
  );
};

export default MiComponentePDF;