


// FileName: src/components/TimerList.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TimerItem from './TimerItem';
import BackgroundTimer from 'react-native-background-timer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TimerModal from './TimerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Timer {
  id: string;
  label: string;
  remainingTime: number;
  isRunning: boolean;
  timerId: any;
}

const TimerList: React.FC = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    loadTimers();
  }, []);

  useEffect(() => {
    if (timers.length > 0) {
      persistTimers();
    }
  }, [timers]);

  const loadTimers = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timers');
      if (jsonValue != null) {
        setTimers(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const persistTimers = async () => {
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
    } catch (e) {
      console.error(e);
    }
  };

  const addTimer = (newTimer: Timer) => {
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  const startTimer = (id: string) => {
    const currentTimer = timers.find(timer => timer.id === id);
    if (currentTimer && !currentTimer.isRunning) {
      const timerId = BackgroundTimer.setInterval(() => {
        setTimers((prevTimers) => {
          const index = prevTimers.findIndex(timer => timer.id === id);
          const updatedTimer = { ...prevTimers[index] };

          if (updatedTimer.remainingTime > 0) {
            updatedTimer.remainingTime--;
          } else {
            BackgroundTimer.clearInterval(updatedTimer.timerId);
            updatedTimer.isRunning = false;
            updatedTimer.timerId = null;
          }

          const updatedTimers = [...prevTimers];
          updatedTimers[index] = updatedTimer;
          return updatedTimers;
        });
      }, 1000);
      
      setTimers((prevTimers) =>
        prevTimers.map(timer => timer.id === id ? { ...timer, isRunning: true, timerId } : timer)
      );
    }
  };

  const stopTimer = (id: string) => {
    const currentTimer = timers.find(timer => timer.id === id);
    if (currentTimer) {
      BackgroundTimer.clearInterval(currentTimer.timerId);
      setTimers((prevTimers) =>
        prevTimers.map(timer => {
          if (timer.id === id) return { ...timer, isRunning: false, timerId: null };
          return timer;
        })
      );
    }
  };

  const pauseTimer = (id: string) => {
    const currentTimer = timers.find(timer => timer.id === id);
    if (currentTimer) {
      BackgroundTimer.clearInterval(currentTimer.timerId);
      setTimers((prevTimers) =>
        prevTimers.map(timer => {
          if (timer.id === id) return { ...timer, isRunning: false, timerId: null };
          return timer;
        })
      );
    }
  };

  const removeCompletedTimer = (id: string) => {
    setTimers((prevTimers) => prevTimers.filter(timer => timer.id !== id));
  };

  return (
    <View style={styles.container}>
      {timers.length === 0 ? (
        <View style={styles.emptyList}>
          <FontAwesomeIcon name="clock-o" size={60} color="grey" />
          <Text>No timers added yet</Text>
        </View>
      ) : (
        <FlatList
          data={timers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TimerItem
              timer={item}
              startTimer={startTimer}
              stopTimer={stopTimer}
              pauseTimer={pauseTimer}
              removeTimer={removeCompletedTimer}
            />
          )}
        />
      )}
      
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
      <TimerModal 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        addTimer={addTimer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
    borderRadius: 30,
    padding: 15,
    elevation: 4,
  },
});

export default TimerList;
