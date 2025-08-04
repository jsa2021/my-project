import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../global/colors';

export default function EventsCard({ events = [] }) {
  const total     = events.length;
  const confirmed = events.filter(e => e.estado === 'confirmado').length;
  const pending   = events.filter(e => e.estado === 'pendiente').length;
  const cancel  = events.filter(e => e.estado === 'cancelado').length;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Turnos Totales</Text>
      <Text style={styles.totalValue}>{total}</Text>

      <View style={styles.statusContainer}>
        <View style={[styles.statusBox, styles.confirmed]}>
          <Text style={styles.statusLabel}>Confirmados</Text>
          <Text style={styles.statusValue}>{confirmed}</Text>
        </View>
        <View style={[styles.statusBox, styles.pending]}>
          <Text style={styles.statusLabel}>Pendientes</Text>
          <Text style={styles.statusValue}>{pending}</Text>
        </View>
         <View style={[styles.statusBox, styles.cancel]}>
          <Text style={styles.statusLabel}>Cancelados</Text>
          <Text style={styles.statusValue}>{cancel}</Text>
        </View>
      </View>
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
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginVertical: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statusBox: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  confirmed: {
    backgroundColor: 'green',
  },
  pending: {
    backgroundColor: 'orange',
  },
   cancel: {
    backgroundColor: 'red',
  },
  statusLabel: {
    fontSize: 12,
    color: colors.inputBackground,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.inputBackground,
    marginTop: 2,
  },
});
