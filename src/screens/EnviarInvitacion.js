import { Button, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { db } from "../service/firebase"; // Importamos `db` desde firebase.js

const EnviarInvitacion = ({ pasoId, capatazId, onInvitationSent }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const enviarInvitacion = async () => {
    setError("");

    if (!email) {
      setError("Introduce un correo electrónico válido.");
      return;
    }

    try {
      // Busca el usuario por email en Firestore
      const usuariosSnapshot = await db
        .collection("usuarios")
        .where("email", "==", email)
        .get();

      if (usuariosSnapshot.empty) {
        setError("El usuario no está registrado en la aplicación.");
        return;
      }

      const usuarioAyudante = usuariosSnapshot.docs[0].data();

      // Crea la invitación en la colección "invitaciones"
      await db.collection("invitaciones").add({
        pasoId,
        capatazId,
        ayudanteId: usuariosSnapshot.docs[0].id, // ID del ayudante encontrado
        ayudanteEmail: email,
        estado: "pendiente",
        fechaInvitacion: new Date().toISOString(),
      });

      alert("Invitación enviada con éxito.");
      if (onInvitationSent) onInvitationSent(); // Llama al callback si se define
    } catch (error) {
      console.error("Error al enviar la invitación:", error);
      setError("Ocurrió un error al enviar la invitación. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Correo Electrónico del Ayudante"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        error={!!error}
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button mode="contained" style={styles.button} onPress={enviarInvitacion}>
        Enviar Invitación
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default EnviarInvitacion;
