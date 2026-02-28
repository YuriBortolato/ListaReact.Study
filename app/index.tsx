import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);
  const [signal, setSignal] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState<string[]>([]);

  function changeSignal() {
    setSignal(!signal);
  }

  function appendInput() {
    setInputList([...inputList, inputValue]);
    setInputValue("");
  }

  function append() {
    setArray([...array, count]);
    setCount(count + 1);
  }

  function increase() {
    console.log("Clicado!: " + count);
    setCount(count + 1);
  }

  useEffect(() => {
    //append();
    //console.log("Ola mundo");
    //console.log("Efeito executado com count:", count);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "skyblue",
      }}
    >
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Text style={{ padding: 10, fontSize: 30 }}>
        {JSON.stringify(inputList, null, 2)}
      </Text>
      <TouchableOpacity
        onPress={appendInput}
        style={{ padding: 20, backgroundColor: "black", borderRadius: 10 }}
      >
        <Text style={{ color: "white" }}>Clique em mim</Text>
      </TouchableOpacity>
    </View>
  );
}
