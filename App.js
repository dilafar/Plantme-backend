import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import CategoriesScreen from './screens/CategoriesScreen';

import ShowAllInquiriesScreen from './screens/inquiry-screens/ShowAllInquiriesScreen';
import ShowSingleInquiryScreen from './screens/inquiry-screens/ShowSingleInquiryScreen';
import AddInquiryScreen from './screens/inquiry-screens/AddInquiryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style='dark'/>
    <NavigationContainer>
         <Stack.Navigator>
             <Stack.Screen name="PlatMe Inquiries" component={ShowAllInquiriesScreen} />
             <Stack.Screen name="Show Inquiry" component={ShowSingleInquiryScreen} />
             <Stack.Screen name="Create Inquiry" component={AddInquiryScreen} />
         </Stack.Navigator>
    </NavigationContainer>
    </>
      
  );
}

const styles = StyleSheet.create({
  container: {},
});
