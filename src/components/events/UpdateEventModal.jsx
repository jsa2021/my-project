import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../global/colors";
import { useGetPacientesQuery } from "../../services/patientsApi";

export default function UpdateEventModal({
  visible,
  onClose,
  event,
  onUpdate,
}) {
  // Obtener lista de pacientes
  const { data: pacientes = [], isLoading, isError } = useGetPacientesQuery();

  // Dropdown pacientes
  const [openPaciente, setOpenPaciente] = useState(false);
  const [itemsPaciente, setItemsPaciente] = useState([]);
  const [valuePaciente, setValuePaciente] = useState(event?.pacienteId || null);

  // Dropdown tipo
  const [openTipo, setOpenTipo] = useState(false);
  const [itemsTipo] = useState([
    { label: "Turno", value: "Turno" },
    { label: "Consulta", value: "Consulta" },
    { label: "Sesion", value: "Sesion" },
  ]);
  const [valueTipo, setValueTipo] = useState(event?.tipo || null);

  // Dropdown estado
  const [openEstado, setOpenEstado] = useState(false);
  const [itemsEstado] = useState([
    { label: "Pendiente", value: "pendiente" },
    { label: "Confirmado", value: "confirmado" },
    { label: "Cancelado", value: "cancelado" },
  ]);
  const [valueEstado, setValueEstado] = useState(event?.estado || "pendiente");

  // Fechas
  const [start, setStart] = useState(
    event ? new Date(event.start) : new Date()
  );
  const [end, setEnd] = useState(
    event ? new Date(event.end) : new Date(Date.now() + 3600000)
  );
  const [showPicker, setShowPicker] = useState(false);

  // Inicializar itemsEvent cuando cambien pacientes
  useEffect(() => {
    setItemsPaciente(pacientes.map((p) => ({ label: p.nombre, value: p.id })));
  }, [pacientes]);

  // Cada vez que cambie start, reajustar end +1h
  useEffect(() => {
    setEnd(new Date(start.getTime() + 3600000));
  }, [start]);

  const onChangeDate = (event, selected) => {
    setShowPicker(false);
    if (selected) setStart(selected);
  };

  const handleUpdate = () => {
    const updatedEvent = {
      ...event,
      pacienteId: valuePaciente,
      pacienteNombre:
        pacientes.find((p) => p.id === valuePaciente)?.nombre || "",
      tipo: valueTipo,
      start: start.toISOString(),
      end: end.toISOString(),
      estado: valueEstado,
    };
    onUpdate(updatedEvent);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Modificar Turno</Text>

          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : isError ? (
            <Text style={styles.errorText}>Error cargando pacientes</Text>
          ) : (
            <DropDownPicker
              open={openPaciente}
              value={valuePaciente}
              items={itemsPaciente}
              setOpen={setOpenPaciente}
              setValue={setValuePaciente}
              setItems={setItemsPaciente}
              placeholder="Paciente"
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
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownList}
            placeholder="Tipo"
            zIndex={2000}
          />

          <DropDownPicker
            open={openEstado}
            value={valueEstado}
            items={itemsEstado}
            setOpen={setOpenEstado}
            setValue={setValueEstado}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownList}
            placeholder="Estado"
            zIndex={1000}
          />

          <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
            <Text style={styles.dateText}>
              Inicio: {start.toLocaleString()}
            </Text>
          </Pressable>
          <View style={[styles.input, styles.disabledInput]}>
            <Text style={styles.dateText}>Fin: {end.toLocaleString()}</Text>
          </View>

          {showPicker && (
            <DateTimePicker
              value={start}
              mode="datetime"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={onChangeDate}
            />
          )}

          <View style={styles.buttons}>
            <Pressable
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={handleUpdate}
              style={[styles.button, styles.submitButton]}
            >
              <Text style={styles.buttonText}>Actualizar</Text>
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
