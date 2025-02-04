import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false, animation: 'shift'}}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Donate"
        component={Home}
        options={{
          tabBarLabel: 'Donasi',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="donate" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={Home}
        options={{
          tabBarLabel: 'Riwayat',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
