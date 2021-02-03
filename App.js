import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Touchable, FlatList, Modal, TextInput, AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';


const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  //Buscando todas as tarefas antes de iniciar o app
  useEffect(() => {

    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  //Salvando caso tenha alguma tarefa alterada
  useEffect( () => {

    async function saveTasks(){ 

      await AsyncStorage.setItem('@task', JSON.stringify(task));
    };

    saveTasks();

  }, [task]);

  function btnSave(){
    if(input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  const btnDelete = useCallback((data) => {
    const find = task.filter( r => r.key !== data.key);
    setTask(find);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff59d" barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}> Minhas Tarefas </Text>
      </View>

      <FlatList 
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key) }
      renderItem={ ({ item }) => <TaskList data={item} handleDelete={btnDelete} />}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.btnBack} onPress={ () => setOpen(false)}>
              <Ionicons style={{marginLeft: 10, marginRight: 5}} name="md-arrow-back" size={40} color="#bf5f82"/>
            </TouchableOpacity>
            <Text style={styles.modalTitle}> Nova Tarefa </Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput 
            multiline={true}
            autoCorrect={false}
            placeholder="O que vou fazer?" 
            style={styles.input}
            value={input}
            onChangeText={ (texto) => setInput(texto)}
            />
            <TouchableOpacity style={styles.btnConfirm} onPress={btnSave}>
              <Text style={styles.btnConfirmText}> Confirmar </Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatedBtn 
      style={styles.btnPlus}
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={ () => setOpen(true)}
      >
        <Ionicons name="ios-add" size={35} color="black"/>
      </AnimatedBtn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff59d',
  },
  content:{

  },
  title:{
    marginTop: 10, 
    paddingBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  btnPlus:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#bf5f82',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 35,
    elevation: 3,
    zIndex: 9,
    shadowColor: "red",
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  },
  modal: {
    flex:1,
    backgroundColor: '#fff59d',
  },
  modalHeader:{
    flexDirection: 'column',
  },
  btnBack:{
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#cbc26d',
    marginEnd: 315,
  },
  modalTitle:{
    marginTop: 10,
    marginLeft: 15,
    fontSize: 23,
    alignSelf: 'center',
  },
  modalBody:{
    marginTop: 15,

  },
  input:{
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    borderRadius: 5,

  },
  btnConfirm:{
    backgroundColor: '#bf5f82',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  btnConfirmText:{
    fontSize: 20,
  },
});
