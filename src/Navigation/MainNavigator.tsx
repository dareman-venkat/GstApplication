import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ScannerScreen from '../Screens/ScannerScreen';
import CartScreen from '../Screens/CartScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={ScannerScreen}
        />
        <Stack.Screen
          options={{
            // headerTitleAlign: 'center',
            title: 'My Cart',
            statusBarColor: '#1B1A55',
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#1B1A55'
            },
          }}
          name="Cart"
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
