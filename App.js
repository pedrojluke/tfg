import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Member from "./src/components/Member";

const App = () => {
  // State to manage tasks and user input
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask(""); // Clear the input
    }
  };

  // Function to delete a task by its index
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do List</Text>
      </View>

      {/* Member Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <FontAwesome5 name="plus" size={24} color="green" onPress={addTask} />
      </View>

      {/* Member List */}
      <ScrollView style={styles.tasks}>
        {tasks.map((text, index) => (
          <Member key={index} text={text} onDelete={() => deleteTask(index)} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  tasks: {
    marginTop: 30,
  },
});

export default App;
