// filepath: /c:/Users/Dev/Documents/react-native/custom/components/CameraScanner.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScanner = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [scannedData, setScannedData] = useState('');

    useEffect(() => {
        const getCameraPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "This app needs access to your camera to scan QR codes.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                setHasCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
            } catch (err) {
                console.warn(err);
            }
        };

        getCameraPermission();
    }, []);

    const handleBarCodeRead = ({ data }) => {
        setScannedData(data);
    };

    if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {hasCameraPermission && (
                <RNCamera
                    style={styles.camera}
                    onBarCodeRead={handleBarCodeRead}
                    captureAudio={false}
                >
                    <View style={styles.cameraView}>
                        <Text style={styles.text}>Scan a QR code</Text>
                    </View>
                </RNCamera>
            )}
            {scannedData ? (
                <View style={styles.result}>
                    <Text>Scanned Data: {scannedData}</Text>
                    <Button title="Scan Again" onPress={() => setScannedData('')} />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    cameraView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    result: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
});

export default CameraScanner;