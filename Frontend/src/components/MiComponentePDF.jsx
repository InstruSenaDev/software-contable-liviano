// MiComponentePDF.jsx
import React from 'react';
import PDF from './PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const MiComponentePDF = () => {
  return (
    <PDFDownloadLink document={<PDF />} fileName="informeCompra">
      {({ loading }) =>
        loading ? (
          <button>Cargando...</button>
        ) : (
          <button>Descargar</button>
        )
      }
    </PDFDownloadLink>
  );
};

export default MiComponentePDF;
