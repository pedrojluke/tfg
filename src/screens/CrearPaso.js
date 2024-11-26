import { Button, FAB, List, TextInput } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";

const CrearPaso = ({ onSave }) => {
  const [nombre, setNombre] = useState("");
  const [trabajaderas, setTrabajaderas] = useState([]);
  const [altura, setAltura] = useState("");
  const [huecos, setHuecos] = useState("");
  const [showForm, setShowForm] = useState(false);

  const agregarTrabajadera = () => {
    if (!altura || !huecos) {
      alert("Por favor, completa todos los campos de la trabajadera.");
      return;
    }

    setTrabajaderas([
      ...trabajaderas,
      {
        id: Date.now().toString(),
        altura: parseInt(altura),
        huecos: parseInt(huecos),
      },
    ]);
    setAltura("");
    setHuecos("");
    setShowForm(false);
  };

  const guardarPaso = () => {
    if (!nombre || trabajaderas.length === 0) {
      alert("El paso debe tener un nombre y al menos una trabajadera.");
      return;
    }

    onSave(nombre, trabajaderas);
  };

  return (
    <View style={styles.container}>
      {/* Nombre del Paso */}
      <TextInput
        label="Nombre del Paso"
        value={nombre}
        onChangeText={setNombre}
        mode="outlined"
        style={styles.input}
      />

      {/* Lista de Trabajaderas */}
      <FlatList
        data={trabajaderas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={`Altura: ${item.altura} cm`}
            description={`Huecos: ${item.huecos}`}
            left={(props) => <List.Icon {...props} icon="ruler" />}
          />
        )}
      />

      {/* Formulario para agregar trabajaderas */}
      {showForm && (
        <View style={styles.form}>
          <TextInput
            label="Altura de la Trabajadera (cm)"
            value={altura}
            onChangeText={setAltura}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Número de Huecos"
            value={huecos}
            onChangeText={setHuecos}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={agregarTrabajadera}
            style={styles.button}
          >
            Añadir Trabajadera
          </Button>
        </View>
      )}

      {/* Botones de Acción */}
      <Button mode="contained" onPress={guardarPaso} style={styles.saveButton}>
        Guardar Paso
      </Button>

      <FAB
        icon={showForm ? "close" : "plus"}
        label={showForm ? "Cerrar" : "Añadir Trabajadera"}
        style={styles.fab}
        onPress={() => setShowForm(!showForm)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  form: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
  },
  saveButton: {
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CrearPaso;
