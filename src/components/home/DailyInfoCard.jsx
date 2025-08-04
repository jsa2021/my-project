import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../global/colors';

export default function DailyInfoCard({ todayFormatted, nextAppointment }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Hoy</Text>
      <Text style={styles.value}>{todayFormatted}</Text>

      <Text style={[styles.label, { marginTop: 16 }]}>Próximo Turno</Text>
      {nextAppointment ? (
        <>
          <Text style={styles.value}>
            {nextAppointment.startDate.toLocaleDateString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            {'\n'}
            {nextAppointment.startDate.toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>

          <Text style={[styles.label, { marginTop: 12 }]}>Paciente</Text>
          <Text style={styles.value}>{nextAppointment.pacienteNombre}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>Tipo</Text>
          <Text style={styles.value}>{nextAppointment.tipo}</Text>
        </>
      ) : (
        <Text style={styles.value}>—</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 24,
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
    textAlign: 'center',
  },
});
