import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/authApi";
import { setUser } from "../features/userSlice";
import { saveSession, initSessionTable } from "../db";
import { colors } from "../global/colors";

const { width } = Dimensions.get("window");
const inputWidth = width * 0.8;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, result] = useLoginMutation();
  const [error, setError] = useState("");  
  const dispatch = useDispatch();

  const onsubmit = () => {
    triggerLogin({ email, password });
  };

 
  useEffect(() => {
    initSessionTable();
  }, []);

  useEffect(() => {
    const saveLoginSession = async () => {
      if (result.status === "fulfilled") {
        try {
          const { localId, email } = result.data;
          saveSession(localId, email);
          dispatch(setUser({ localId, email }));
        } catch (error) {
          console.log("Error al guardar sesión:", error);
        }
      } else if (result.status === "rejected") {
        setError("Hubo un error al iniciar sesión. Verifica tus credenciales.");
        console.log("Hubo un error al iniciar sesión");
      }
    };

    saveLoginSession();
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clínica</Text>
      <Text style={styles.subTitle}>Iniciar sesión</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          style={styles.input}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={styles.button}
        onPress={onsubmit}
        disabled={result.isLoading}
      >
        {result.isLoading ? (
          <ActivityIndicator color={colors.buttonText} />
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </Pressable>


      <View style={styles.footer}>
        <Text style={styles.text}>¿No tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Regístrate</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    marginTop: 8,
    marginBottom: 24,
  },
  inputContainer: {
    width: inputWidth,
    gap: 12,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
  },
  error: {
    marginTop: 12,
    backgroundColor: colors.errorBackground,
    color: colors.errorText,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.button,
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 32,
    gap: 6,
  },
  text: {
    color: colors.textPrimary,
  },
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
});
