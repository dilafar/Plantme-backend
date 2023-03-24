import {useLayoutEffect , useState, useEffect} from 'react';
import { View , FlatList, Text, StyleSheet} from "react-native";
import PlantItem from "../components/PlantItem";
import { MEALS , CATEGORIES} from "../data/dummy-data";
import UpdatePlants from './UpdatePlants';
import { useNavigation, useIsFocused } from '@react-navigation/native';


const PlantsOverviewScreen = ({route , navigation}) => {
    const navigation2 = useNavigation();
    const isFocused = useIsFocused();
    const [plants, setplants] = useState([]);
    const [plantId , setPlantId] = useState('');
    const [currentPlant, setcurrentPlant] = useState({});
    const [visibility, setvisibility] = useState(false);
    const id = route.params.categoryId;
    const displayplants = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(id) >= 0;
    });
    const displayplants2 = plants.filter((plant) => {
        return plant.category === id;
    });
    


    useEffect(() => {
        if (isFocused) {
            fetchPlants();
            console.log('Screen is focused, refreshing data...');
        }
        
        console.log(plants);
    }, [isFocused]);
    

  

    const fetchPlants = async () => {
        // Fetch all inquiries from backend API
        fetch('https://plantme-backend.onrender.com/api/plant')
            .then(response => response.json())
            .then((data) => {
                setplants(data.data);
            })
            .catch(error => console.error(error));
    };

    useLayoutEffect(() => {
        const catTitle = CATEGORIES.find((category)=> category.id === id).title;
    
        navigation.setOptions({
            title: catTitle,
        });   
        
    },[id,navigation]);



   

    function renderPlantItem (itemData){
        const item = itemData.item;
       //setPlantId(item._id);
       // setcurrentPlant(item);
        const plantItemprops = {
            title: item.plantName,
            imageUrl: item.imageUrl,
            affortability: item.price,
            complexity: item.category,
            duration: item._id,
        }
            return <PlantItem {...plantItemprops} visibility={visibility}  setvisibility={setvisibility} item={item} setcurrentPlant={setcurrentPlant}/>
    }

  
  return (
   <View style={styles.container}>
           <UpdatePlants visibility={visibility} setvisibility={setvisibility} currentPlant={currentPlant}/>
            <FlatList data={plants.filter((plant) => {
        return plant.category === id;
    })} keyExtractor={(item) => item.id} renderItem={renderPlantItem}/>
   </View>
  )
}

export default PlantsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }

});
