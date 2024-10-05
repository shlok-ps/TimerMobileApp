


// FileName: src/components/TimerModal.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

interface TimerModalProps {
  isVisible: boolean;
  onClose: () => void;
  addTimer: (timer: {
    id: string;
    label: string;
    remainingTime: number;
    isRunning: boolean;
    timerId: null;
  }) => void;
}

const TimerModal: React.FC<TimerModalProps> = ({ isVisible, onClose, addTimer }) => {
  const [label, setLabel] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');

  const handleAddTimer = () => {
    const newTimer = {
      id: Date.now().toString(),
      label,
      remainingTime: parseInt(hours || "0") * 3600 + parseInt(minutes || "0") * 60 + parseInt(seconds || "0"),
      isRunning: false,
      timerId: null,
    };

    addTimer(newTimer);
    resetInputs();
    onClose();
  };

  const resetInputs = () => {
    setLabel('');
    setHours('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Add Timer</Text>
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={setLabel}
          placeholder="Timer label"
        />
        <TextInput
          style={styles.input}
          value={hours}
          onChangeText={setHours}
          placeholder="Hours"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={minutes}
          onChangeText={setMinutes}
          placeholder="Minutes"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={seconds}
          onChangeText={setSeconds}
          placeholder="Seconds"
          keyboardType="numeric"
        />
        <Button title="Add Timer" onPress={handleAddTimer} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default TimerModal;
