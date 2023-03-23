// ShowAllInquiriesScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShowAllInquiriesScreen = () => {
    const navigation = useNavigation();
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        // Fetch all inquiries from backend API
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        // Fetch all inquiries from backend API
        fetch('https://a898-175-157-47-187.ngrok.io/api/inquiry/')
            .then(response => response.json())
            .then(data => setInquiries(data.data))
            .catch(error => console.error(error));
    };

    // function to handle refresh button press
    const handleRefresh = () => {
        fetchInquiries();
    };

    const handleInquiryPress = (id) => {
        // Navigate to ShowSingleInquiryScreen with the inquiry ID
        navigation.navigate('Show Inquiry', { id: id });
    };

    const createInquiryPress = () => {
        // Navigate to AddInquiryScreen
        navigation.navigate('Create Inquiry');
    }

    const renderInquiryItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleInquiryPress(item._id)} style={styles.item}>
                <Text style={styles.itemTitle}>{item.customerName}</Text>
                <Text>{item.type}</Text>
                <Text>{item.status}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Inquiries</Text>
            <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                <Text style={styles.buttonText}>Refrsh</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <Button title="Create Inquiry" onPress={createInquiryPress} />
            <View style={styles.horizontalLine} />
            {inquiries.length > 0 ? (
                <FlatList
                    data={inquiries}
                    renderItem={renderInquiryItem}
                    keyExtractor={(item) => item._id}
                    style={styles.list}
                />
            ) : (
                <Text>No inquiries found.</Text>
            )}
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
    list: {
        flexGrow: 0,
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        marginBottom: 10,
    },
    itemTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 8,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ShowAllInquiriesScreen;
