import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {formatearFecha} from '../helpers/index'

export const DetallePaciente = props => {
  const {pacienteEdit, setModalDetallePaciente, setPacienteEdit} = props;
  console.log(pacienteEdit);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>
        Información <Text style={styles.tituloBold}>Paciente</Text>
      </Text>
      <View>
        <Pressable
          style={styles.btnCerrar}
          onLongPress={() => {
            setModalDetallePaciente(false);
            setPacienteEdit({})
          }}>
          <Text style={styles.btnCerrarTexto}>Cerrar</Text>
        </Pressable>
      </View>

      <View style={styles.contenido}>
        
        <View tyle={styles.campo}>
          <Text style={styles.label}>Paciente:</Text>
          <Text style={styles.valor}>{pacienteEdit.pacienteForm}</Text>
        </View>
        
        <View tyle={styles.campo}>
          <Text style={styles.label}>Propietario:</Text>
          <Text style={styles.valor}>{pacienteEdit.propietarioForm}</Text>
        </View>

        <View tyle={styles.campo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.valor}>{pacienteEdit.emailForm}</Text>
        </View>

        <View tyle={styles.campo}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{pacienteEdit.telefonoForm}</Text>
        </View>

        <View tyle={styles.campo}>
          <Text style={styles.label}>Fecha Alta:</Text>
          <Text style={styles.valor}>{formatearFecha(pacienteEdit.fechaForm)}</Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Síntomas:</Text>
          <Text style={styles.valor}>{pacienteEdit.sintomasForm}</Text>
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCerrarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  campo: {
    marginBottom:30,
    padding:3
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 10,
    marginBottom:3,
  },
  valor: {
    fontWeight: '700',
    fontSize: 17,
    color: '#334155',
  },
});
