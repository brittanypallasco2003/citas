
  //FORMATEAR FECHA
export const formatearFecha = fechaFormatear => {
    const nuevaFecha = new Date(fechaFormatear);

    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return nuevaFecha.toLocaleDateString('es-Es', opciones);
  };