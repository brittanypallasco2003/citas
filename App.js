import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Alert, Modal} from 'react-native';
import {Formulario} from './src/components/Formulario';
import {Paciente} from './src/components/Paciente';
import {DetallePaciente} from './src/components/DetallePaciente';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  //estado para mostrar los pacientes que se agregen
  const [listadoPacientes, setListadoPacientes] = useState([]); //el arreglo se llenara de objetos (nuevoPaciente), los cuales tienen la info de los pacientes

  //estado para actualizar un paciente en específico
  const [pacienteEdit, setPacienteEdit] = useState({});
  
  //state para la pantalla emergente de detalle paciente
const [modalDetallePaciente, setModalDetallePaciente] = useState(false)

  //recibe el id por el parámetro: id del componente formulario donde hace el llamado a esta función.
  const pacienteEditar = id => {
    //compara el id recibido del comp: Pacientes, itera  cada elemento del arreglo listadoPacientes y compara la propiedad id (la del objeto) de cada elemento con el id recibido

    //retorna al final el paciente que coincide con el id recibido
    const pacienteEditar = listadoPacientes.filter(
      pacienteEdit => pacienteEdit.id === id,
    );

    setPacienteEdit(pacienteEditar[0]); //se pone la posición 0, para acceder directamente al objeto con los datos del paciente, puesto que .filter arroja un [{}]
  };

  //ELIMINAR UN PACIENTE
  const pacienteEliminar = idPacienteEliminar => {
    Alert.alert(
      '¿Deseas Eliminar este Paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Sí, Eliminar', 
        //retorna un arreglo con los pacientes que no tengan el id, del paciente a Eliminar para setearlo en el estado listadoPacientes y tener este estado con los valores de los pacientes existentes
        onPress: () => {const pacientesActuales=listadoPacientes.filter(pacienteState=>pacienteState.id!==idPacienteEliminar)
        setListadoPacientes(pacientesActuales)
        }
      
      },
      ],
    );
    console.log('eliminar paciente', idPacienteEliminar);
  };

const cerrarModal = () => {
  setModalVisible(false)
}


  //los hook se colocan en la parte superior

  //esto no vale porque react cuenta los hooks declarados y si esta condición no se cumple,es como si hubiera desaparecido el hook
  //const autenticado=false
  // if(autenticado){
  //   const [auth, setAuth] = useState([])
  // }

  //tampoco no puedes colocarlo después de un return
  // if (autenticado) return
  //   const [auth, setAuth] = useState([])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      {/* espera a que suceda el evento on press para llamar la función setModalVisible */}

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {/* Comprueba si hay pacientes en el estado: listado Pacientes */}
      {listadoPacientes.length == 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes registrados</Text>
      ) : (
        // si existen pacientes, se muestra un FlatList
        <FlatList
          style={styles.listado}
          data={listadoPacientes}
          // keyExtractor itera sobre los elementos del arreglo:  listadoPacientes, (los objetoses de nuestro arreglo, es decir los objetos: nuevosPacientes)
          keyExtractor={item => {
            item.id;
          }}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalDetallePaciente={setModalDetallePaciente}
                setPacienteEdit={setPacienteEdit}
              /> //Paciente es el comp que será la representación visual de cada item/objeto ( cada paciente). La función renderItem recibe un objeto item y lo retorna al componente Paciente para renderizar cada uno de los objetos de la lista del estado pacientes. Es decir, renderItem, retorna siempre un componente pasándole item como prop
            );
          }}
        />
      )}

{/* utilizar esto cuando se quiere mostrar un modal de forma condicional y no se quiera ingresar dentro de un comp <Modal></Modal> */}
{modalVisible && (
      <Formulario
      modalVisible={modalVisible}
      cerrarModal={cerrarModal}
        setListadoPacientes={setListadoPacientes}
        listadoPacientes={listadoPacientes}
        pacienteEdit={pacienteEdit}
        setPacienteEdit={setPacienteEdit}
      />
)}

      <Modal
      visible={modalDetallePaciente}
      animationType='fade'>
        <DetallePaciente
        pacienteEdit={pacienteEdit}
        setPacienteEdit={setPacienteEdit}
        setModalDetallePaciente={setModalDetallePaciente}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  //crea una hoka de estilos. Recibe un objeto con los estilos
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: 'bold',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
