import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDF from './PDF'

export const Prueba = () => {
  return (
    <PDFDownloadLink document={<PDF />} fileName="informeCompra.pdf" >

    {({ loading }) => 
      loading ? (
        <button>
          Cargando...
        </button>
      ) : (
        <button>
          Descargar  
        </button>
      )
    }

  </PDFDownloadLink>
  )
}
