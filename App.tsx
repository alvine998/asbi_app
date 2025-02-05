import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Account from './src/screens/account/Account';
import Login from './src/screens/auth/Login';
import Registration from './src/screens/auth/Registration';
import Otp from './src/screens/auth/Otp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailDonation from './src/screens/donation/DetailDonation';
import PaymentDonation from './src/screens/donation/PaymentDonation';
import PaymentConfirmation from './src/screens/donation/PaymentConfirmation';
import PaymentDone from './src/screens/donation/PaymentDone';
import ListDonation from './src/screens/donation/ListDonation';
import ListInfaq from './src/screens/donation/ListInfaq';
import ListSedekah from './src/screens/donation/ListSedekah';
import ListZakat from './src/screens/donation/ListZakat';
import BottomTabs from './src/components/BottomTabs';
import CreateDonation from './src/screens/donation/CreateDonation';
import Surah from './src/screens/quran/Surah';
import Ayah from './src/screens/quran/Ayah';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Otp" component={Otp} />

      {/* Donation */}
      <Stack.Screen name="ListDonation" component={ListDonation} />
      <Stack.Screen name="ListInfaq" component={ListInfaq} />
      <Stack.Screen name="ListSedekah" component={ListSedekah} />
      <Stack.Screen name="ListZakat" component={ListZakat} />
      <Stack.Screen name="DetailDonation" component={DetailDonation} />
      <Stack.Screen name="PaymentDonation" component={PaymentDonation} />
      <Stack.Screen name="CreateDonation" component={CreateDonation} />

      {/* Quran */}
      <Stack.Screen name="ListSurah" component={Surah} />
      <Stack.Screen name="ListAyah" component={Ayah} />
      <Stack.Screen
        name="PaymentConfirmation"
        component={PaymentConfirmation}
      />
      <Stack.Screen name="PaymentDone" component={PaymentDone} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
