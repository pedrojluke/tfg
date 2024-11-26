import { FAB, List } from "react-native-paper";
import { FlatList, View } from "react-native";

import React from "react";

const HomeScreen = ({ pasos, onAddPaso, onPasoClick }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pasos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item title={item.nombre} onPress={() => onPasoClick(item.id)} />
        )}
      />
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        label="Añadir Paso"
        onPress={onAddPaso}
      />
    </View>
  );
};

export default HomeScreen;
