import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { colors } from "../../global/colors";
import CameraIcon from "../../components/CameraIcon";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { usePutProfilePictureMutation } from "../../services/userApi";
import { setProfilePicture, clearUser } from "../../features/userSlice";
import NavLink from "../../components/NavLink";

const ProfileScreen = () => {
  const dispatch = useDispatch(); 
 

  const user = useSelector((state) => state.user.userEmail);
  const localId = useSelector((state) => state.user.localId);
  const image = useSelector((state) => state.user.profilePicture);
  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();



  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Necesito acceso a la cámara");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled) {
        const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        dispatch(setProfilePicture(imgBase64));
        triggerPutProfilePicture({ localId, image: imgBase64 });
      }
    } catch (e) {
      console.error("Error en pickImage:", e);
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.screen}>
 <NavLink to="OptionsScreen" label="Administrar Cuenta →" />

      <View style={styles.profileContainer}>
        <View style={styles.imageProfileContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Text style={styles.textProfilePlaceHolder}>
              {user.charAt(0).toUpperCase()}
            </Text>
          )}
          <Pressable
            onPress={pickImage}
            hitSlop={16} // 4️⃣ Zona táctil más grande
            style={({ pressed }) => [
              { opacity: pressed ? 0.9 : 1 },
              styles.cameraIcon,
            ]}
          >
            <CameraIcon />
          </Pressable>
        </View>

        <Text style={styles.profileData}>Email: {user}</Text>

        
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: { flex: 1,   backgroundColor: colors.Mainbackground, },
  profileContainer: {
    justifyContent: "s",
    alignItems: "center",
    padding: 16
  },
  imageProfileContainer: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: colors.purple,
    justifyContent: "center",
    alignItems: "center",
  },
  textProfilePlaceHolder: {
    color: colors.buttonText,
    fontSize: 48,
  },
  profileData: {
    paddingVertical: 16,
    fontSize: 16,
    padding: 16
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 128,
  },
  text: { fontSize: 18 },
});
