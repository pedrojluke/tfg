import React, { useEffect, useState } from "react";

import CrearPaso from "./src/screens/CrearPaso";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { db } from "./src/service/firebase";

const Stack = createStackNavigator();

export default function App() {
  const [pasos, setPasos] = useState([]); // Estado para guardar los pasos

  // Función para obtener pasos desde Firestore
  const fetchPasos = async () => {
    try {
      const pasosSnapshot = await db
        .collection("pasos")
        .orderBy("createdAt", "desc")
        .get();
      const pasosData = pasosSnapshot.docs.map((doc) => ({
        id: doc.id, // Agregar el ID del documento
        ...doc.data(),
      }));
      setPasos(pasosData);
    } catch (error) {
      console.error("Error al obtener los pasos desde Firestore:", error);
    }
  };
  // Usar useEffect para obtener los pasos cuando el componente se monte
  useEffect(() => {
    fetchPasos();
  }, []);

  const handleSavePaso = async (nombre, trabajaderas) => {
    try {
      await db.collection("pasos").add({
        nombre,
        trabajaderas,
        createdAt: new Date(),
      });

      console.log("Paso guardado correctamente en Firestore.");
    } catch (error) {
      console.error("Error al guardar el paso en Firestore:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: "Mis Pasos" }}>
          {({ navigation }) => (
            <HomeScreen
              pasos={pasos}
              onAddPaso={() => navigation.navigate("CrearPaso")}
              onPasoClick={(id) => console.log(`Paso seleccionado: ${id}`)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="CrearPaso" options={{ title: "Crear Nuevo Paso" }}>
          {({ navigation }) => (
            <CrearPaso
              onSave={async (nombre, trabajaderas) => {
                await handleSavePaso(nombre, trabajaderas); // Guardar el paso en Firestore
                navigation.goBack(); // Volver al HomeScreen
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
