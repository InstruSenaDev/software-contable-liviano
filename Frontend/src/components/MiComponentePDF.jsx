// MiComponentePDF.jsx
import React from 'react';
import PDF from './PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const MiComponentePDF = () => {

  const estilobtn ={
    backgroundColor: 'blue', // Color de fondo verde
    color: 'white',              // Texto en blanco
    padding: '10px 20px',        // Espaciado interno
    border: 'none',              // Sin borde
    borderRadius: '5px',         // Bordes redondeados
    cursor: 'pointer',        
  };

  return (
    <PDFDownloadLink document={<PDF />} fileName="informeCompra">
      {({ loading }) =>
        loading ? (
          <button>Cargando...</button>
        ) : (
          <button style={estilobtn}>Descargar</button>
        )
      }
    </PDFDownloadLink>
  );
};

export default MiComponentePDF;
