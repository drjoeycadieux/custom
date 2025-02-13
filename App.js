import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you have react-native-vector-icons installed

// components
import QrcodeScanner from './components/QrcodeScanner';
import CameraScanner from './components/CameraScanner';

const App = () => {
      const [showCamera, setShowCamera] = useState(false);

      const handleRefresh = () => {
            // Add your refresh logic here
            console.log('Refresh button pressed');
      };

      const handleCamera = () => {
            setShowCamera(true);
      };

      const handleScan = (data) => {
            console.log('QR Code scanned:', data);
            setShowCamera(false);
      };

      return (
            <View style={styles.container}>
                  <StatusBar
                        backgroundColor="transparent"
                        barStyle="light-content"
                        translucent={true}
                  />
                  <View style={styles.header}>
                        <Text style={styles.headerText}>QRcode Generator</Text>
                        <View style={styles.buttonContainer}>
                              <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                                    <Icon name="refresh" size={24} color="white" />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={handleCamera} style={styles.cameraButton}>
                                    <Icon name="camera" size={24} color="white" />
                              </TouchableOpacity>
                        </View>
                  </View>
                  <View style={styles.content}>
                        {showCamera ? (
                              <CameraScanner onScan={handleScan} />
                        ) : (
                              <QrcodeScanner />
                        )}
                  </View>
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#fff',
      },
      header: {
            height: 90,
            backgroundColor: '#ab5d26',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0, // Adjust for the status bar height
            paddingHorizontal: 16,
      },
      headerText: {
            color: 'white',
            fontSize: 20,
      },
      buttonContainer: {
            flexDirection: 'row',
      },
      refreshButton: {
            padding: 10,
      },
      cameraButton: {
            padding: 10,
      },
      content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
      },
});

export default App;