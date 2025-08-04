import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { colors } from "../../global/colors";
import NavLink from "../../components/NavLink";
import { useDispatch } from "react-redux";
import { clearSession } from "../../db";
import { clearUser } from "../../features/userSlice";

export default function OptionsScreen() {
  const dispatch = useDispatch(); 

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, cerrar",
          style: "destructive",
          onPress: async () => {
            dispatch(clearUser());
            await clearSession();
          }
        }
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={styles.screen}>
     
     <NavLink back label="← Volver" />
      <View style={styles.container}>
    


         <Pressable
                  onPress={handleLogout}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.7 : 1 },
                    styles.logoutButton,
                  ]}
                >
                  <Text style={styles.logoutText}>Cerrar sesión</Text>
                </Pressable>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.Mainbackground,
  },
  container: { flex: 1, padding: 16},
  text: { fontSize: 18 },
  
  logoutButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.buttonCancel,
    borderRadius: 8,
  
  },
  logoutText: {
    textAlign: "center",
    color: colors.buttonText,
    fontWeight: "600",
  }
});
