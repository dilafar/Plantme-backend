import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './screens/CategoriesScreen';
import DeliveryForm from "./components/Delivery/deliveryDataSubmit";
import DeliveryList from "./components/Delivery/deliveryList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DeliveryForm"
            component={DeliveryForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DeliveryList"
            component={DeliveryList}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
