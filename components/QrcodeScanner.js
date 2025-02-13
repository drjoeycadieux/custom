import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrcodeScanner = () => {
    const [inputValue, setInputValue] = useState('');
    const [qrValue, setQrValue] = useState('');

    const generateQRCode = () => {
        setQrValue(inputValue);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter link or url to generate QR code"
                value={inputValue}
                onChangeText={setInputValue}
            />
            <TouchableOpacity style={styles.button} onPress={generateQRCode}>
                <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>
            {qrValue ? <QRCode value={qrValue} size={200} /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 50, // Increased height
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10, // Added borderRadius for rounded corners
    },
    button: {
        backgroundColor: '#ab5315',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default QrcodeScanner;