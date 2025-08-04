import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "../../global/colors";
import { useGetPacientesQuery } from "../../services/patientsApi";

export default function CreateEventModal({ visible, onClose, onSubmit }) {
  // Pacientes
  const { data: pacientes = [], isLoading, isError } = useGetPacientesQuery();
  const [openPacientes, setOpenPacientes] = useState(false);
  const [itemsPacientes, setItemsPacientes] = useState([]);
  const [valuePacientes, setValuePacientes] = useState(null);

  // Tipo
  const [openTipo, setOpenTipo] = useState(false);
  const [itemsTipo] = useState([
    { label: "Turno", value: "Turno" },
    { label: "Consulta", value: "Consulta" },
    { label: "Sesion", value: "Sesion" },
  ]);
  const [valueTipo, setValueTipo] = useState(null);

  // Estado
  const [openEstado, setOpenEstado] = useState(false);
  const [itemsEstado] = useState([
    { label: "Pendiente", value: "pendiente" },
    { label: "Confirmado", value: "confirmado" },
    { label: "Cancelado", value: "cancelado" },
  ]);
  const [valueEstado, setValueEstado] = useState("pendiente");

  // Fechas
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date(Date.now() + 3600000));
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    setItemsPacientes(pacientes.map((p) => ({ label: p.nombre, value: p.id })));
  }, [pacientes.length]);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirm = (date) => {
    hideDatePicker();
    setStart(date);
    setEnd(new Date(date.getTime() + 3600000));
  };

  const handleSubmit = () => {
    const id = `evt-${Date.now()}`;
    const selPaciente = pacientes.find((p) => p.id === valuePacientes);
    onSubmit({
      id,
      pacienteId: valuePacientes,
      pacienteNombre: selPaciente?.nombre || "",
      tipo: valueTipo || "",
      start: start.toISOString(),
      end: end.toISOString(),
      estado: valueEstado,
    });
    // Reset
    setValuePacientes(null);
    setValueTipo(null);
    setValueEstado("pendiente");
    setStart(new Date());
    setEnd(new Date(Date.now() + 3600000));
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Agendar Turno</Text>

          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : isError ? (
            <Text style={styles.errorText}>Error cargando pacientes</Text>
          ) : (
            <DropDownPicker
              open={openPacientes}
              value={valuePacientes}
              items={itemsPacientes}
              setOpen={setOpenPacientes}
              setValue={setValuePacientes}
              setItems={setItemsPacientes}
              placeholder="Selecciona paciente"
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownStyle={styles.dropdownList}
              zIndex={3000}
            />
          )}

          <DropDownPicker
            open={openTipo}
            value={valueTipo}
            items={itemsTipo}
            setOpen={setOpenTipo}
            setValue={setValueTipo}
            placeholder="Selecciona tipo"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownList}
            zIndex={2000}
          />

          <DropDownPicker
            open={openEstado}
            value={valueEstado}
            items={itemsEstado}
            setOpen={setOpenEstado}
            setValue={setValueEstado}
            placeholder="Selecciona estado"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownList}
            zIndex={1000}
          />

          <Pressable onPress={showDatePicker} style={styles.input}>
            <Text style={styles.dateText}>
              Inicio: {start.toLocaleString()}
            </Text>
          </Pressable>
          <View style={[styles.input, styles.disabledInput]}>
            <Text style={styles.dateText}>Fin: {end.toLocaleString()}</Text>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            date={start}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            textColor={colors.textPrimary}
          />

          <View style={styles.buttons}>
            <Pressable
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              style={[styles.button, styles.submitButton]}
            >
              <Text style={styles.buttonText}>Crear</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: colors.textPrimary,
  },
  dropdownContainer: {
    marginBottom: 12,
    width: "100%",
  },
  dropdown: {
    backgroundColor: colors.inputBackground,
    borderColor: "#CCC",
  },
  dropdownList: {
    backgroundColor: colors.inputBackground,
    borderColor: "#CCC",
  },
  input: {
    borderColor: colors.placeholder,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: colors.inputBackground,
  },
  dateText: {
    color: colors.textPrimary,
  },
  disabledInput: {
    opacity: 0.6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: colors.errorBackground,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: "600",
  },
  errorText: {
    color: colors.errorText,
    marginBottom: 12,
  },
});
