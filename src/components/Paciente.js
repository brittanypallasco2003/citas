import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {formatearFecha} from '../helpers/index'

//Recuerda formatear la fecha porque New Date arroja un dato de tipo objeto
export const Paciente = ({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
  setModalDetallePaciente,
  setPacienteEdit,
}) => {
  const {pacienteForm, fechaForm, id} = item;

  return (
    <Pressable
    //setModalDetallePaciente está dentro de una función es para evitar que la ventana emergente de Detalle paciente de inmediato se muestre, sino que espere a que se ejecute el eveneto de longPress para mostrar la ventana emergente
    onLongPress={() => { setModalDetallePaciente(true)
        //nos permite enviarle al componente APP, el objeto que contiene al actual paciente para que este pueda enviarselo al componente Detalle paciente
    setPacienteEdit(item) }}>
      <View style={styles.contenedor}>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}>{pacienteForm}</Text>
        <Text style={styles.fecha}>{formatearFecha(fechaForm)}</Text>

        <View style={styles.contenedorBotones}>
          <Pressable
            style={[styles.btn, styles.btnEditar]}
            onLongPress={() => {
              setModalVisible(true);
              // mediante este llamado a la función propia de app se envía el id a app
              pacienteEditar(id);
            }}>
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => {
              pacienteEliminar(id);
            }}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94a3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  texto: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});
