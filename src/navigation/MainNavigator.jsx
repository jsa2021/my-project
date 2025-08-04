import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/userApi";
import { setProfilePicture } from "../features/userSlice";
import { useEffect, useState } from "react";
import { initSessionTable, getSession } from "../db";
import { ActivityIndicator, View } from "react-native";
import { setUser } from "../features/userSlice";
import { colors } from "../global/colors";

export default function MainNavigator() {
  const userEmail = useSelector((state) => state.user.userEmail);
  const localId = useSelector((state) => state.user.localId);
  const [checkingSession, setCheckingSession] = useState(true);

  const dispatch = useDispatch();
  const {
    data: profilePicture,
    isLoading,
    error,
  } = useGetProfilePictureQuery(localId);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await initSessionTable();
        const sessionArr = await getSession();
        const session = sessionArr[0];
        if (session) {
          dispatch(setUser({ email: session.email, localId: session.localId }));
        }
      } catch (e) {
        console.log("Error en bootstrap:", e);
      } finally {
        setCheckingSession(false);
      }
    };

    bootstrap();
  }, []);

  useEffect(() => {
    if (profilePicture) {
      dispatch(setProfilePicture(profilePicture.image));
    }
  }, [profilePicture]);

  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userEmail ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
