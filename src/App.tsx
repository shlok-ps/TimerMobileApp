


// FileName: App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TimerList from './src/components/TimerList';
import Icon from 'react-native-vector-icons/FontAwesome';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Check if there are timer items */}
      <TimerList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
