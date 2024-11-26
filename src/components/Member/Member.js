import { FAB, List } from "react-native-paper";
import { FlatList, View } from "react-native";
import React, { useState } from "react";

import { style } from "./MemberStyle";

const Member = ({ costaleros, onAddCostalero }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <View style={style.container}>
      {/* Lista de Costaleros */}
      <FlatList
        data={costaleros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={`Altura: ${item.altura} cm`}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
        )}
      />

      {/* Mostrar u ocultar formulario */}
      {showForm && (
        <MemberForm
          onAddCostalero={onAddCostalero}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Botón flotante */}
      <FAB
        icon={showForm ? "close" : "plus"}
        label={showForm ? "Cerrar" : "Añadir Costalero"}
        style={style.fab}
        onPress={() => setShowForm(!showForm)}
      />
    </View>
  );
};

export default Member;
