import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const App = () => {
      return (
            <View style={styles.container}>
                  <StatusBar
                        backgroundColor="transparent"
                        barStyle="light-content"
                        translucent={true}
                  />
                  <View style={styles.header}>
                        <Text style={styles.headerText}>Header</Text>
                  </View>
                  <View style={styles.content}>
                        <Text>Welcome to the app!</Text>
                  </View>
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#afb3b0',
      },
      header: {
            height: 90,
            backgroundColor: '#182e8f',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: StatusBar.currentHeight, // Adjust for the status bar height
      },
      headerText: {
            color: 'white',
            fontSize: 20,
      },
      content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
      },
});

export default App;