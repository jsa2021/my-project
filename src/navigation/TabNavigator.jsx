import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeStackNavigator from './tabs/HomeStackNavigator';
import CalendarStackNavigator from './tabs/CalendarStackNavigator';
import OptionsStackNavigator from './tabs/OptionsStackNavigator';
import { colors } from '../global/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio')       iconName = 'home';
          else if (route.name === 'Calendario') iconName = 'calendar-month';
          else if (route.name === 'Opciones')   iconName = 'cog';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textPrimary,
      })}
    >
      <Tab.Screen name="Inicio"       component={HomeStackNavigator} />
      <Tab.Screen name="Calendario"   component={CalendarStackNavigator} />
      <Tab.Screen name="Opciones"     component={OptionsStackNavigator} />
    </Tab.Navigator>
  );
}
