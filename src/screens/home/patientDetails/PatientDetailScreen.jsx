import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import NavLink from '../../../components/NavLink';
import { colors } from '../../../global/colors';
import Card from '../../../components/Card';

export default function PatientDetailScreen({ route }) {
  const { patientId } = route.params;

  // 1. Traer el paciente
  const patient = useSelector(state =>
    state.patients.list.find(p => p.id === patientId)
  );

  // 2. Traer los turnos de este paciente
  const appointments = useSelector(state =>
    state.events.list.filter(e => e.pacienteId === patientId)
  );

  if (!patient) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const {
    nombre,
    edad,
    email,
    telefono,
    direccion,
    observaciones,
  } = patient;

  return (
       <View style={styles.screen}>
              <NavLink back label="← Volver" />
    <ScrollView  contentContainerStyle={styles.content}>


      <Text style={styles.name}>{nombre}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{edad} años</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{telefono}</Text>
      </View>

      {direccion && (
        <View style={styles.field}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>{direccion}</Text>
        </View>
      )}

      {observaciones && (
        <View style={styles.field}>
          <Text style={styles.label}>Observaciones:</Text>
          <Text style={styles.value}>{observaciones}</Text>
        </View>
      )}

      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Turnos asignados</Text>
  {appointments.length === 0 ? (
    <Text style={styles.noAppointments}>No hay turnos asignados.</Text>
  ) : (
    appointments.map(evt => {
      const fecha = new Date(evt.start).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      const hora = new Date(evt.start).toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return (
        <Card key={evt.id}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appType}>{evt.tipo}</Text>
            <Text style={styles.appDate}>{fecha} — {hora}</Text>
          </View>
          <Text style={styles.appStatus}>{evt.estado}</Text>
        </Card>
      );
    })
  )}
</View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.Mainbackground,
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  field: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.textSecondary,
    width: 100,
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
    flexWrap: 'wrap',
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  noAppointments: {
    fontStyle: 'italic',
    color: colors.textSecondary,
  },
  appType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  appDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  appStatus: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
    fontWeight: "bold"
  },
});
