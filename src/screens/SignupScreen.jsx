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
import { useSignupMutation } from "../services/authApi";
import { setUser } from "../features/userSlice";
import { saveSession, initSessionTable } from "../db";
import signupSchema from '../utils/signupSchema';
import { colors } from "../global/colors";

const { width } = Dimensions.get("window");
const inputWidth = width * 0.8;



export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState("");


  useEffect(() => {
    initSessionTable();
  }, []);

 const handleCreateAccount = async () => {
  try {
    signupSchema.validateSync(
      { email, password, confirmPassword },
      { abortEarly: false }
    );
    try {
      const response = await signup({
        email,
        password,
        returnSecureToken: true,
      }).unwrap();
      dispatch(setUser({ email: response.email, localId: response.localId }));
      await saveSession(response.localId, response.email);
    
    } catch (apiErr) {
      const message =
        apiErr.data?.error?.message ||
        apiErr.error?.message ||
        "Error al registrar";
      setError(message);
    }
  } catch (validationErr) {
    const msgs = validationErr.inner.map(err => err.message).join("\n");
    setError(msgs);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clínica</Text>
      <Text style={styles.subTitle}>Registro</Text>

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
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirm}
          placeholder="Repetir contraseña"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          style={styles.input}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={styles.button}
        onPress={handleCreateAccount}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.buttonText} />
        ) : (
          <Text style={styles.buttonText}>Crear cuenta</Text>
        )}
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.text}>¿Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Iniciar sesión</Text>
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
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
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
