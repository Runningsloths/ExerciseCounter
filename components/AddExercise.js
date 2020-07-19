import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default AddExercise = ({addExercise}) => {

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSet, setExerciseSet] = useState(0);
  const [exerciseRep, setExerciseRep] = useState(0);
  const [exerciseMin, setExerciseMin] = useState(0);
  const [exerciseSec, setExerciseSec] = useState(0);

  const changeExerciseName = (text) => setExerciseName(text);
  const changeExerciseSet = (num) => setExerciseSet(parseInt(num, 10));
  const changeExerciseRep = (num) => setExerciseRep(parseInt(num, 10));
  const changeExerciseMin = (num) => setExerciseMin(parseInt(num, 10));
  const changeExerciseSec = (num) => setExerciseSec(parseInt(num, 10));
  
  const exerciseNameInput = useRef(null);
  const numSetsInput = useRef(null);
  const numRepsInput = useRef(null);
  const minInput = useRef(null);
  const secInput = useRef(null);
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput ref={exerciseNameInput} placeholder='Exercise Name...' placeholderTextColor='#ACACAC' style={styles.nameInput} onChangeText={changeExerciseName}/>
        <TextInput ref={numSetsInput} placeholder='# Of Sets...' placeholderTextColor='#ACACAC' style={styles.setrepInput} onChangeText={changeExerciseSet}/>
        <TextInput ref={numRepsInput} placeholder='# Of Reps...' placeholderTextColor='#ACACAC' style={styles.setrepInput} onChangeText={changeExerciseRep}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput ref={minInput} placeholder='Minutes...' placeholderTextColor='#ACACAC' style={styles.timeInput} onChangeText={changeExerciseMin}/>
        <TextInput ref={secInput} placeholder='Seconds...' placeholderTextColor='#ACACAC' style={styles.timeInput} onChangeText={changeExerciseSec}/>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => {
            const newTime = exerciseMin*60 + exerciseSec;
            addExercise(exerciseName, exerciseSet, exerciseRep, newTime);
            exerciseNameInput.current.clear();
            numSetsInput.current.clear();
            numRepsInput.current.clear();
            minInput.current.clear();
            secInput.current.clear();
          }}>
          <Text style={styles.btnText}>
            Add Exercise
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180
  },
  timeInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#3F3F3F',
    color: '#FFF'
  },
  btnContainer: {
    width: 200,
    alignSelf: 'flex-end',
    padding: 1,
    flex: 1,
    marginBottom: 5
  },
  inputContainer: {
    flex: 1,
    padding: 5,
    height: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  nameInput: {
    flex: 2,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#3F3F3F',
    color: '#FFF'
  },
  setrepInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#3F3F3F',
    color: '#FFF'
  },
  btn: {
    backgroundColor: '#453A67',
    padding: 10,
    margin: 4
  },
  btnText: {
    color: '#EEEAE1',
    fontSize: 20,
    textAlign: 'center'
  }
})