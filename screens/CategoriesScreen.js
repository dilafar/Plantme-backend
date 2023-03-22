import {CATEGORIES} from '../data/dummy-data';
import { FlatList } from 'react-native';
import CategoryGridTitle from '../components/CategoryGridTitle';

function renderData(itemData){
    return <CategoryGridTitle title={itemData.item.title} color={itemData.item.color} />;
}

function CategoriesScreen () {
  return (
    <FlatList 
        data={CATEGORIES} 
        keyExtractor={(item) => item.id}
        renderItem={renderData}
        numColumns={2}
    />
  )
}

export default CategoriesScreen;