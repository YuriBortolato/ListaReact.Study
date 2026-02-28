import { Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Task = {
  id: string;
  name: string;
  createdAt: string;
};

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  function getFormattedDate() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0"); 
    const yyyy = now.getFullYear();
    const HH = String(now.getHours()).padStart(2, "0");
    const MM = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    return `${dd}/${mm}/${yyyy} (${HH}:${MM}:${ss})`;
  }

  function addTask() {
    if (inputValue.trim() === "") return;

    const newTask: Task = {
      id: Math.random().toString(36).substring(7), 
      name: inputValue,
      createdAt: getFormattedDate(),
    };

    setTaskList([newTask, ...taskList]);
    setInputValue(""); 
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Minhas Tarefas</Text>

      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Digite uma nova tarefa..."
        style={styles.input}
        onSubmitEditing={addTask} 
        returnKeyType="send" 
      />

      <TouchableOpacity onPress={addTask} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        style={{ width: "100%", marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDate}>Criado em: {item.createdAt}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "black",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  taskDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});