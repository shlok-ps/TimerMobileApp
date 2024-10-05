


// FileName: src/components/TimerItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TimerItemProps {
  timer: {
    id: string;
    label: string;
    remainingTime: number;
    isRunning: boolean;
  };
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  removeTimer: (id: string) => void;
}

const TimerItem: React.FC<TimerItemProps> = ({ timer, startTimer, pauseTimer, removeTimer }) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{timer.label} - </Text>
      <Text style={styles.timerText}>
        {timer.remainingTime > 0 ? formatTime(timer.remainingTime) : '00h 00m 00s'}
      </Text>
      <View style={styles.buttonContainer}>
	{timer.remainingTime === 0 ? (
          <TouchableOpacity onPress={() => removeTimer(timer.id)} style={styles.circleButton}>
            <Icon name="check" size={30} color="green" />
          </TouchableOpacity>
        ) : (<>
            {timer.isRunning ? (
              <>
                <TouchableOpacity onPress={() => pauseTimer(timer.id)} style={styles.circleButton}>
                  <Icon name="pause" size={30} color="blue" />
                </TouchableOpacity>
              </>
            ) : (<>
              <TouchableOpacity onPress={() => startTimer(timer.id)} style={styles.circleButton}>
                <Icon name="play" size={30} color="green" />
              </TouchableOpacity>
		<TouchableOpacity style={styles.closeButton} onPress={() => !timer.isRunning && removeTimer(timer.id)}>
			<Icon name="close" size={30} color="red" />
		</TouchableOpacity>
		</>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 2,
  },
  labelText: {
    fontSize: 22, // Larger font size for labels
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5, // Added padding between label and time
  },
  timerText: {
    fontSize: 20, // Slightly smaller size for timer text
    flex: 1,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  circleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
  },
});

export default TimerItem;
