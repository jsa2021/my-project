import { StyleSheet, View, Dimensions } from 'react-native';
import { colors } from '../global/colors';

const { width } = Dimensions.get('window');

const Card = ({ children, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: 'black',
    elevation: 4,
    borderRadius: 8,
    width: width - 32,
    alignSelf: 'center',
    justifyContent: 'space-between', 
  },
});
