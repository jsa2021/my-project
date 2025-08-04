import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../../screens/calendar/CalendarScreen";
import EventScreen from "../../screens/calendar/EventScreen"; 

const Stack = createNativeStackNavigator();

export default function CalendarStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ title: "Calendario" }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ title: "Detalle del turno" }}
      />
    </Stack.Navigator>
  );
}
