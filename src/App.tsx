


// FileName: App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TimerList from './src/components/TimerList';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
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
