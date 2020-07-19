import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import { uuid } from 'uuidv4';

export default TimerHandler = ({ sets, reps, time }) => {

  const [paused, setPaused] = useState(false);
  const [playBtnOpacity, setPlayBtnOpacity] = useState(100);
  const [pauseBtnOpacity, setPauseBtnOpacity] = useState(0);
  const [setsLeft, setSetsLeft] = useState(sets);
  const [id, setId] = useState(uuid());

  const changeIcon = () => {
    setPaused(!paused);
    if (!paused) {
      setPlayBtnOpacity(0);
      setPauseBtnOpacity(100);
    }
    else {
      setPlayBtnOpacity(100);
      setPauseBtnOpacity(0);
    }
  }

  const updateTime = () => {
    if (setsLeft > 0) {
      setPaused(changeIcon);
      setId(uuid());
      setSetsLeft((prevSets) => prevSets - 1);
    }
  }

  const AnimatedNumber = () => {
    
    return (
      <View style={styles.bigAnimatedBoxContainer}>
        <View style={styles.animatedBoxContainer}>
          <View style={styles.animatedBox} />
          <Text style={styles.text}>{setsLeft}</Text>
        </View>
        <Text style={styles.setsOfText}> sets of </Text>
        <View style={styles.animatedBoxContainer}>
          <View style={styles.animatedBox} />
          <Text style={styles.text}>{reps}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <CountDown style={styles.timer}
        id={id}
        until={time}
        onFinish={updateTime}
        size={40}
        timeToShow={['M', 'S']}
        timeLabels={{ m: 'MM', s: 'SS' }}
        timeLabelStyle={{ color: '#FFF' }}
        digitStyle={{ backgroundColor: '#FFF' }}
        separatorStyle={{ color: '#FFF' }}
        running={paused}
        showSeparator
        />
        <AnimatedNumber />
        <View style={styles.icon}>
          <Icon style={{opacity: playBtnOpacity, position: 'absolute'}} name='playcircleo' color='#FFF' size={100} />
          <Icon style={{opacity: pauseBtnOpacity, position: 'absolute'}} name='pausecircleo' color='#FFF' size={100} 
          onPress={changeIcon}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10
  },
  timer: {
    paddingTop: 40,
  },
  text: {
    fontSize: 24,
  },
  setsOfText: {
    fontSize: 18,
    color: '#FFF'
  },
  icon: {
    alignItems: 'center'
  },
  bigAnimatedBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3e3e3e',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    margin: 50,
    marginBottom: 70
  },
  animatedBoxContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedBox: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 0.5,
    position: 'absolute',
  }
})