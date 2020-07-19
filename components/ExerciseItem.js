import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default ExerciseItem = ({item, removeExercise, onPress}) => {

  const Item = () => {
    return (
      <View>
        <Text style={styles.listItemText}>{item.name}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <View style={styles.listItemView}>
            <Item />
            <Icon name='remove' size={20} color='firebrick' onPress={() => removeExercise(item.id)} />
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    fontSize: 20,
    paddingLeft: 10,
  }
});