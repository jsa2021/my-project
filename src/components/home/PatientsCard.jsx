import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../global/colors';

export default function PatientsCard({ count }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Pacientes</Text>
      <Text style={styles.value}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 4,
  },
});
