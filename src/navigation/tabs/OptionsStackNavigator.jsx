import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OptionsScreen from "../../screens/options/OptionsScreen";
import ProfileScreen from "../../screens/options/ProfileScreen"; 

const Stack = createNativeStackNavigator();

export default function OptionsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
     
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
       <Stack.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={{ title: "Opciones" }}
      />
    </Stack.Navigator>
  );
}
