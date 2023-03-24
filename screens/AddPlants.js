import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput,Text, Alert, TouchableOpacity, ImageBackground , Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

const AddPlants = ({ navigation }) => {

    const [plantName, setplantName] = useState('');
    const [description, setdescription] = useState('');
    const [ category, setcategory] = useState('');
    const [ price, setprice] = useState('');
    const [imageUrl, setimageUrl] = useState('');

    const handleSubmit = async () => {
        console.log('submitted');
        try {
            await axios.post('https://plantme-backend.onrender.com/api/plant', {
                plantName,
                description,
                price,
                category,
                imageUrl,
            });
            fetchPlants();
            Alert.alert('Success', 'Plant has been submitted successfully');
            navigation.goBack();
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to submit inquiry. Please try again');
        }
    };

    
    const fetchPlants = async () => {
        // Fetch all inquiries from backend API
        fetch('https://plantme-backend.onrender.com/api/plant')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch(error => console.error(error));
    };

  return (
   
    <ImageBackground
    style={styles.backgroundImage}
    source={require('../assets/bg-add.jpg')}
>
<View style={styles.container}>
<Text style={styles.title}>We'll contact you!</Text>
<Input
    placeholder="Plant Name"
    value={plantName}
    onChangeText={setplantName}
    style={styles.input}
/>

<Input
    placeholder="Plant Price"
    value={price}
    onChangeText={setprice}
    style={styles.input}
/>

<ModalDropdown
    options={['c1', 'c2', 'c3']}
    onSelect={(index, value) => setcategory(value)}
    style={styles.modelDropdown}
    textStyle={{ fontSize: 16 }}
    dropdownTextStyle={{ fontSize: 16 }}
    dropdownStyle={styles.dropdown}
    defaultValue={'Select Type'}
/>
<Input
    placeholder="Set Image"
    value={imageUrl}
    onChangeText={setimageUrl}
    style={styles.input}
/>
<Input
    placeholder="Description"
    value={description}
    onChangeText={setdescription}
    style={styles.input}
    multiline={true}
    numberOfLines={3}
/>

<View style={styles.horizontalLine} />
<Button title="Submit" onPress={handleSubmit} style={styles.button} />

</View>
</ImageBackground>
   
  )
}

export default AddPlants;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },

});
