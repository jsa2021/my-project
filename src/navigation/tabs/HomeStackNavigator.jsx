import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/home/HomeScreen";
import PatientsScreen from "../../screens/home/PatientsScreen";
import PatientDetailScreen from "../../screens/home/patientDetails/PatientDetailScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="PatientsScreen"
        component={PatientsScreen}
        options={{ title: "Pacientes" }}
      />
      <Stack.Screen
        name="PatientDetailScreen"
        component={PatientDetailScreen}
        options={{ title: "Detalle Paciente" }}
      />
    </Stack.Navigator>
  );
}
