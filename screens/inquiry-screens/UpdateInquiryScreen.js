import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';

const UpdateInquiryScreen = ({ route, navigation }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerEmailAddress, setCustomerEmailAddress] = useState('');
    const [customerMobileNumber, setCustomerMobileNumber] = useState('');
    const [type, setType] = useState('');
    const [customerMessage, setCustomerMessage] = useState('');

    const { id } = route.params;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://plantme-backend.onrender.com/api/inquiry/${id}`);
            setCustomerName(response.data.data.customerName);
            setCustomerEmailAddress(response.data.data.customerEmailAddress);
            setCustomerMobileNumber(response.data.data.customerMobileNumber);
            setType(response.data.data.type);
            setCustomerMessage(response.data.data.customerMessage);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`https://plantme-backend.onrender.com/api/inquiry/${id}`, {
                customerName,
                customerEmailAddress,
                customerMobileNumber,
                type,
                customerMessage,
            });
            Alert.alert('Inquiry updated successfully!');
            navigation.navigate('Show Inquiry', { id });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Anything to Change?</Text>
            <TextInput
                placeholder="Customer Name"
                value={customerName}
                onChangeText={setCustomerName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email Address"
                value={customerEmailAddress}
                onChangeText={setCustomerEmailAddress}
                style={styles.input}
            />
            <TextInput
                placeholder="Mobile Number"
                value={customerMobileNumber}
                onChangeText={setCustomerMobileNumber}
                style={styles.input}
            />
            <ModalDropdown
                options={['Product Inquiry', 'Service Inquiry', 'General Inquiry']}
                onSelect={(index, value) => setType(value)}
                style={styles.modelDropdown}
                textStyle={{ fontSize: 16 }}
                dropdownTextStyle={{ fontSize: 16 }}
                dropdownStyle={styles.dropdown}
                defaultValue={type}
            />
            <TextInput
                placeholder="Message"
                value={customerMessage}
                onChangeText={setCustomerMessage}
                style={[styles.input, styles.messageInput]}
                multiline={true}
                numberOfLines={4}
            />
            <Button title="Update" onPress={handleUpdate} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        marginBottom: 10,
        width: '100%',
    },
    modelDropdown: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        marginBottom: 10,
        marginLeft: 0,
        width: '100%',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
    dropdown: {
        width: '100%',
    },
});

export default UpdateInquiryScreen;
