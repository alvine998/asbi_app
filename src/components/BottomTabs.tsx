import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ListDonation from '../screens/donation/ListDonation';
import Account from '../screens/account/Account';
import {Text, TouchableOpacity, View} from 'react-native';
import ChooseCategory from '../screens/donation/create/ChooseCategory';

const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation}: any) {
  const CustomTabButton = ({children, onPress}: any) => (
    <TouchableOpacity
      style={{
        top: 0, // Lift the button
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.navigate('ChooseCategory');
      }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'green',
          paddingTop: 15,
          transform: [{rotate: '45deg'}],
          alignItems: "center",
          justifyContent: "center"
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
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
        component={ListDonation}
        options={{
          tabBarLabel: 'Donasi',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="donate" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ChooseCategory"
        component={ChooseCategory}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View>
              <FontAwesome5Icon name="times" color={'white'} size={size} />
            </View>
          ),
          tabBarButton: props => <CustomTabButton {...props} />,
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
        component={Account}
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
