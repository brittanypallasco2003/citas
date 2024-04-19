import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  Button,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

export const Formulario = props => {
  //STATE DE LOS INPUTS
  const [id, setId] = useState('');
  const [pacienteForm, setPacienteForm] = useState('');
  const [propietarioForm, setPropietarioForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [telefonoForm, setTelefonoForm] = useState('');
  const [sintomasForm, setSintomasForm] = useState('');
  const [fechaForm, setFechaForm] = useState(new Date());

  const {
    modalVisible,
    cerrarModal,
    setListadoPacientes,
    listadoPacientes,
    pacienteEdit: pacienteObjEditable,
    setPacienteEdit,
  } = props;

  // si muestran en el formulario, los datos del paciente si el valor de pacienteObjEditable cambia, es decir cuando aplaste el boton editar,
  useEffect(() => {
    if (Object.keys(pacienteObjEditable).length > 0) {
      setId(pacienteObjEditable.id);
      setPacienteForm(pacienteObjEditable.pacienteForm);
      setPropietarioForm(pacienteObjEditable.propietarioForm);
      setEmailForm(pacienteObjEditable.emailForm);
      setFechaForm(pacienteObjEditable.fechaForm);
      setTelefonoForm(pacienteObjEditable.telefonoForm);
      setSintomasForm(pacienteObjEditable.sintomasForm);
    }
  }, [pacienteObjEditable]);

  //lOGICA PARA ALMACENAR UNA CITA
  const guardarNuevaCita = () => {
    //validar antes de guardar: valida que todos los campos del formualrio estén llenos

    if (
      [
        pacienteForm,
        propietarioForm,
        emailForm,
        fechaForm,
        sintomasForm,
      ].includes('')
    ) {
      // esta línea verifica que el arreglo tenga una cadena vacía como elemento - si lo tiene lo evaluá como true

      //alertas nativas
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Entendido'},
      ]);

      //Retorna la alerta si todos los campos no están llenos
      return;
    }

    //SI TODOS LOS CAMPOS ESTÁN LLENOS
    //CREA UN OBJETO con todos los valores del state que almacenan el valor de los inputs del form, donde como las variables son iguales a los nombre de las propiedades se escribe directamente, el nombre de la variable---> pacienteForm: pacienteForm
    const nuevoPaciente = {
      pacienteForm,
      propietarioForm,
      emailForm,
      telefonoForm,
      fechaForm,
      sintomasForm,
    };

    //Revisar si es un nuevo registro o edición, revisando si el id existe o no, si no existe, es porque aún no ha sido creado el paciente
    if (id) {
      //editando

      //le agrega el mismo id DEL STATE: idForm, al objeto: nuevoPaciente
      nuevoPaciente.id = id; //este id es el del state que también tiene el mismo nombre que la propiedad del objeto nuevoPaciente

      //itera sobre el state pacientes de app (contiene la lista de objetos de los nuevosPacitens), comparando el id de cada objeto, de esa lista de objetos con el del objeto nuevopaciente que se crea con un nuevo registro y reescribiendo el valor actual del input y por tanto del state asignado a ese input en el objeto--->nuevoPaciente
      const pacientesActualizados = listadoPacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      );

      //.map retorna un nuevo arreglo con la modificación de la edición, por eso no se usa spread operator
      setListadoPacientes(pacientesActualizados);

      //setear el obj del state que utilizamos para mostrar en los inputs los datos de ese paciente
      setPacienteEdit({});
    } else {
      //nuevo registro
      //si es nuevo registro se asigna un id
      nuevoPaciente.id = Date.now();

      //AGREGA UN NUEVO PACIENTE AL RESTO
      setListadoPacientes([...listadoPacientes, nuevoPaciente]); //toma una copia del arreglo con los pacientes previos en el estado (con los elementos de este arreglo) y se le agrega un nuevo paciente al arreglo, que es también es un objeto
      console.log(nuevoPaciente);
    }

    //cuando llena el formulario se cierra la ventana emergente
    cerrarModal();
    //Dejar los campos vacíos de los formularios al guardar la cita
    setId('');
    setPacienteForm('');
    setPropietarioForm('');
    setEmailForm('');
    setSintomasForm('');
    setTelefonoForm('');
    setFechaForm(new Date());
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>{pacienteObjEditable.id? 'Editar':'Nueva'}{' '}<Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
             cerrarModal()
              setPacienteEdit({});
              // al dar click en cancelar que también se reseté los inputs del form de tal forma que solo al presinar editar se mostraran los valores en los inputs
              setId('');
              setPacienteForm('');
              setPropietarioForm('');
              setEmailForm('');
              setSintomasForm('');
              setTelefonoForm('');
              setFechaForm(new Date());
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              value={pacienteForm}
              onChangeText={setPacienteForm}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              value={propietarioForm}
              onChangeText={setPropietarioForm}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario"
              keyboardType={'email-address'}
              placeholderTextColor={'#666'}
              value={emailForm}
              onChangeText={setEmailForm}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono Propietario"
              keyboardType={'number-pad'}
              placeholderTextColor={'#666'}
              value={telefonoForm}
              onChangeText={setTelefonoForm}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fechaForm}
                locale="es"
                onDateChange={date => setFechaForm(date)}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas Paciente</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Síntomas"
              placeholderTextColor={'#666'}
              value={sintomasForm}
              onChangeText={setSintomasForm}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable style={styles.btnNuevaCita} onPress={guardarNuevaCita}>
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObjEditable.id? 'Editar':'Agregar'} Paciente</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
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
  btnCancelar: {
    marginTop: 20,
    marginBottom: 11,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
