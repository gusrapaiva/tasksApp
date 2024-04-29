import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import ShoppingItem from './components/TaskList.js';
import { useEffect, useState } from 'react';
import { db, collection, addDoc, getDocs } from "./FirebaseConfig.js";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = async () => {
    try {
      const docRef = await addDoc(collection(db, "tarefas"), {
        task: task,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTask("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getTasks();
  }

  const getTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tarefas"));
      const tempList = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        tempList.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tempList);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Tarefas</Text>
      </View>

      {

        tasks.length > 0 ?
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <ShoppingItem
                task={item.task}
                isChecked={item.isChecked}
                id={item.id}
                getTasks={getTasks}
              />
            )}
            keyExtractor={item => item.id}
          />
          : (
            <ActivityIndicator />
          )}

      <TextInput
        placeholder="Escreva uma nova tarefa"
        style={styles.input}
        value={task}
        onChangeText={(text) => setTask(text)}
        onSubmitEditing={addTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
  },
  input: {
    backgroundColor: "lightblue",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 10,
  },
});
