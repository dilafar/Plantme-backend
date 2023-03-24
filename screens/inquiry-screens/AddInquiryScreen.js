import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

export default function AddInquiryScreen({ navigation }) {
    const [customerName, setCustomerName] = useState('');
    const [customerEmailAddress, setCustomerEmailAddress] = useState('');
    const [customerMobileNumber, setCustomerMobileNumber] = useState('');
    const [type, setType] = useState('');
    const [customerMessage, setCustomerMessage] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('https://a898-175-157-47-187.ngrok.io/api/inquiry/', {
                customerName,
                customerEmailAddress,
                customerMobileNumber,
                type,
                customerMessage,
                status: "true",
            });
            Alert.alert('Success', 'Inquiry has been submitted successfully');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to submit inquiry. Please try again');
        }
    };

    const goToPolicyScreen = () => {
        navigation.navigate('Inquiry Policies');
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>We'll contact you!</Text>
            <Input
                placeholder="Customer Name"
                value={customerName}
                onChangeText={setCustomerName}
                style={styles.input}
            />
            <Input
                placeholder="Email Address"
                value={customerEmailAddress}
                onChangeText={setCustomerEmailAddress}
                style={styles.input}
            />
            <Input
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
                defaultValue={'Select Type'}
            />
            <Input
                placeholder="Message"
                value={customerMessage}
                onChangeText={setCustomerMessage}
                style={styles.input}
                multiline={true}
                numberOfLines={3}
            />
            <Text style={{ fontSize: 18 }}>
                By submitting a inquiry, you agree to our{' '}
                <TouchableOpacity onPress={goToPolicyScreen}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                        Terms and Conditions - Inquiry Policies
                    </Text>
                </TouchableOpacity>
                .
            </Text>
            <View style={styles.horizontalLine} />
            <Button title="Submit your Inquiry" onPress={handleSubmit} style={styles.button} />
            
        </View>
    );
}

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
        marginLeft: 10,
        width: '95%',
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
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
    },

});
