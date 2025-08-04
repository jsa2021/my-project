import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../global/colors';

export default function NavLink({
  to,
  back = false,
  label,
  containerStyle,
  textStyle,
  ...props
}) {
  const navigation = useNavigation();
  const handlePress = () => {
    if (back) navigation.goBack();
    else if (to) navigation.navigate(to);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        styles.linkContainer,
        containerStyle,
      ]}
      {...props}
    >
      <Text style={[styles.linkText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
});
