import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db, doc, updateDoc, deleteDoc } from "../FirebaseConfig.js";

const ShoppingItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.task);

  const updateIsChecked = async () => {
    const tasksRef = doc(db, "tarefas", props.id);

    await updateDoc(tasksRef, {
      isChecked: isChecked,
    });
  };

  const deleteTask = async () => {
    await deleteDoc(doc(db, "tarefas", props.id));
    props.getTasks();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateTask(props.id, editedTask);
    setIsEditing(false);
  };

  const updateTask = async (id, newTask) => {
    try {
      const tasksRef = doc(db, "tarefas", id);
      await updateDoc(tasksRef, {
        task: newTask,
      });
      props.getTasks();
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
    }
  };

  useEffect(() => {
    updateIsChecked();
  }, [isChecked]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <AntDesign name="checkcircle" size={24} color="green" />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="gray" />
        )}
      </Pressable>
      {/* texto das tasks */}
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editedTask}
          onChangeText={setEditedTask}
          onSubmitEditing={handleSave}
        />
      ) : (
        <Text style={styles.task}>{props.task}</Text>
      )}
      {/* edit button */}
      {!isEditing && (
        <Pressable onPress={handleEdit}>
          <MaterialIcons name="edit" size={24} color="blue" />
        </Pressable>
      )}
      {/* delete button */}
      <Pressable onPress={deleteTask}>
        <MaterialIcons name="delete" size={24} color="red" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000'
  },
  task: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  editInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500",
    backgroundColor: "white",
  },
});
