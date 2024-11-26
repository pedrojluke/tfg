import { Button, FAB, List, TextInput } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";

const CostalerosScreen = ({ costaleros, onAddCostalero }) => {
  const [nombre, setNombre] = useState("");
  const [altura, setAltura] = useState("");
  const [showForm, setShowForm] = useState(false);

  const agregarCostalero = () => {
    if (!nombre || !altura) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onAddCostalero({
      id: Date.now().toString(),
      nombre,
      altura: parseInt(altura),
    });
    setNombre("");
    setAltura("");
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      {/* Lista de Costaleros */}
      <FlatList
        data={costaleros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={`${item.nombre}`}
            description={`Altura: ${item.altura} cm`}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
        )}
      />

      {/* Formulario para añadir costaleros */}
      {showForm && (
        <View style={styles.form}>
          <TextInput
            label="Nombre del Costalero"
            value={nombre}
            onChangeText={setNombre}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Altura (cm)"
            value={altura}
            onChangeText={setAltura}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={agregarCostalero}
            style={styles.button}
          >
            Añadir Costalero
          </Button>
        </View>
      )}

      {/* Botón flotante para mostrar formulario */}
      <FAB
        icon={showForm ? "close" : "plus"}
        label={showForm ? "Cerrar" : "Añadir Costalero"}
        style={styles.fab}
        onPress={() => setShowForm(!showForm)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  form: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CostalerosScreen;
