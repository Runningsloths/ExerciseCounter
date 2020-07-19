// author: Tony Yeon
// date published: 7-18-2020

import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';

import 'react-native-get-random-values';
import { uuid } from 'uuidv4';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import AddExercise from './components/AddExercise';
import ExerciseItem from './components/ExerciseItem';
import TimerHandler from './components/TimerHandler';

function HomeScreen({ navigation }) {

  const [exercise, setExercise] = useState([]);

  const addExercise = async (name, sets, reps, time) => {
    console.log(`${name} ${sets} ${reps} ${time}`);
    if (!name || !sets || !reps || !time) {
      Alert.alert('Error', 'Please enter valid values', [{text: 'OK'}]);
    }
    else {
      setExercise(prevExercises => {
        return [{id: uuid(), name: name, sets: sets, reps: reps, time: time}, ...prevExercises];
      })
    }
  }

  const removeExercise = async (id) => {
    setExercise(prevExercises => {
      return prevExercises.filter(exercise => exercise.id != id);
    })
    try {
      const jsonValue = JSON.stringify(exercise);
      await AsyncStorage.setItem('exercise', jsonValue);
    }
    catch(e) {
      console.log(e);
    }
  }

  const getData = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('exercise');
      if (jsonValue !== null) {
        setExercise(JSON.parse(jsonValue));
      }
    } 
    catch(e) {
      console.log(e);
    }
  }
  
  useEffect(() => { getData() }, []);

  useEffect(() => { AsyncStorage.setItem('exercise', JSON.stringify(exercise)); }, [ exercise ]);

  return (
    <View style={styles.container}>
      <AddExercise addExercise={addExercise}/>
      <FlatList
        style={styles.list}
        data={exercise}
        renderItem={({item, index}) => (
          <ExerciseItem item={item} removeExercise={removeExercise} onPress={() => {
            navigation.navigate('Timer', {
            name: exercise[index].name,
            sets: exercise[index].sets,
            reps: exercise[index].reps,
            time: exercise[index].time
          })}} />
        )} />
    </View>
  )
}

function TimerScreen({ route, navigation }) {

  const { sets } = route.params;
  const { reps } = route.params;
  const { time } = route.params;

  return (
    <View style={styles.container}>
      <TimerHandler sets={sets} reps={reps} time={time}/>
    </View>

  );
}

const Stack = createStackNavigator();

export default App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Exercise Timer' }}/>
        <Stack.Screen name='Timer' component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929'
  },
  list: {
    padding: 5
  }
})