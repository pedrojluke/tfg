import { Alert, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React, { useState } from "react";

import { style } from "./MemberStyle";

// Componente para el formulario de añadir costaleros
const MemberForm = ({ onAddCostalero, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [altura, setAltura] = useState("");

  const handleAdd = () => {
    if (!nombre || !altura) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    onAddCostalero({
      id: Date.now().toString(),
      nombre,
      altura: parseInt(altura, 10),
    });
    setNombre("");
    setAltura("");
    onClose();
  };

  return (
    <View style={style.form}>
      <TextInput
        label="Nombre del Costalero"
        value={nombre}
        onChangeText={setNombre}
        mode="outlined"
        style={style.input}
      />
      <TextInput
        label="Altura (cm)"
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
        mode="outlined"
        style={style.input}
      />
      <Button mode="contained" onPress={handleAdd} style={style.button}>
        Añadir Costalero
      </Button>
    </View>
  );
};
