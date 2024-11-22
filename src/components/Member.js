import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Member = ({ text, onDelete }) => {
  return (
    <View style={styles.task}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  delete: {
    color: "red",
  },
});

export default Member;
