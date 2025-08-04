import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Search from "../../components/Search";
import Card from "../../components/Card";
import NavLink from "../../components/NavLink";
import CreateEventModal from "../../components/events/CreateEventModal";
import UpdateEventModal from "../../components/events/UpdateEventModal";
import { colors } from "../../global/colors";
import {
  selectFilteredEvents,
  setFilterStatus,
  addEvent,
  loadEvents,
  deleteEvent,
  updateEvent,
} from "../../features/eventsSlice";
import {
  initEventsTableDB,
  saveEventDB,
  deleteEventDB,
  getEventsByEmailDB,
  updateEventDB,
} from "../../db";

export default function EventsScreen() {
  const dispatch = useDispatch();

  
  const eventsRedux = useSelector(selectFilteredEvents);
  const filterStatus = useSelector((state) => state.events.filterStatus);
  const [isLoading, setLoading]   = useState(true);
  const [isError, setIsError]   = useState(false);
  
  const userEmail = useSelector((state) => state.user.userEmail);


  const [keyword, setKeyword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);


  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    initEventsTableDB()
      .then(() => getEventsByEmailDB(userEmail))
      .then((events) => {
        dispatch(loadEvents(events));
        setLoading(false);
      })
      .catch((err) => console.error("Error BD events:", err, setIsError(true)));
  }, [userEmail]);

  const handleDelete = (id) => {
    Alert.alert(
      "Eliminar turno",
      "¿Estás seguro de que quieres eliminar este turno?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEventDB(id);
              dispatch(deleteEvent(id));
            } catch (e) {
              console.error("Error eliminando turno:", e);
            }
          },
        },
      ]
    );
  };

  const handleCreateEvent = (evt) => {
    const nuevo = { ...evt, id: Date.now().toString(), email: userEmail };
    saveEventDB(nuevo)
      .then(() => dispatch(addEvent(nuevo)))
      .catch((err) => console.error("Error guardando event:", err));
    setModalVisible(false);
  };

  const handleUpdateEvent = (evt) => {
    updateEventDB(evt)
      .then(() => dispatch(updateEvent(evt)))
      .catch((err) => console.error("Error actualizando event:", err));
    setUpdateModalVisible(false);
  };

  // Filtrar por búsqueda y estado
  const filteredByKeyword = eventsRedux.filter(
    (evt) =>
      (evt.pacienteNombre || "")
        .toLowerCase()
        .includes(keyword.toLowerCase()) ||
      (evt.tipo || "").toLowerCase().includes(keyword.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar turnos.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Card>
      <View style={styles.info}>
        <Text style={styles.fecha}>
          {new Date(item.start).toLocaleString()}
        </Text>
        <Text style={styles.titulo}>{item.tipo}</Text>
        <Text style={styles.paciente}>{item.pacienteNombre}</Text>
        <Text style={[styles.estado, styles[`estado_${item.estado}`]]}>
          {item.estado}
        </Text>
        <View style={styles.itemButtons}>
          <Pressable
            onPress={() => {
              setSelectedEvent(item);
              setUpdateModalVisible(true);
            }}
          >
            <Text style={styles.editText}>Editar</Text>
          </Pressable>
          <Pressable onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.screen}>
      <NavLink back label="← Volver" />
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.createButton}
      >
        <Text style={styles.createButtonText}>+ Nuevo Turno</Text>
      </Pressable>

   
      <View style={styles.filtersContainer}>
        {["", "confirmado", "pendiente", "cancelado"].map((status) => (
          <Pressable
            key={status}
            onPress={() => dispatch(setFilterStatus(status))}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filterStatus === status && styles.filterTextActive,
              ]}
            >
              {status === ""
                ? "Todos"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Search keyword={keyword} setKeyword={setKeyword} />

      <FlatList
        data={filteredByKeyword}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron turnos.</Text>
        }
      />

      <CreateEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateEvent}
      />

      {selectedEvent && (
        <UpdateEventModal
          visible={updateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          event={selectedEvent}
          onUpdate={handleUpdateEvent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.Mainbackground },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { paddingVertical: 8, paddingHorizontal: 16 },
  info: {
    width: "100%",
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 8,
  },
  fecha: { fontSize: 14, color: colors.textPrimary },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    color: colors.textPrimary,
  },
  paciente: { fontSize: 14, marginTop: 2, color: colors.textPrimary },
  estado: { marginTop: 4, fontSize: 12, fontWeight: "500" },
  estado_confirmado: {
    padding: 4,
    color: colors.inputBackground,
    backgroundColor: "green",
    borderRadius: 4,
  },
  estado_pendiente: {
    padding: 4,
    color: colors.inputBackground,
    backgroundColor: "orange",
    borderRadius: 4,
  },
  estado_cancelado: {
    padding: 4,
    color: colors.inputBackground,
    backgroundColor: "red",
    borderRadius: 4,
  },
  deleteText: { color: "red", marginTop: 8, textAlign: "right", padding: 8 },
  editText: {
    color: colors.primary,
    marginTop: 8,
    textAlign: "left",
    padding: 8,
  },
  itemButtons: { flexDirection: "row", justifyContent: "flex-end" },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: colors.inputBackground,
  },
  errorText: { color: colors.errorBackground, fontSize: 16 },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  filterButtonActive: { backgroundColor: colors.primary },
  filterText: {
    fontSize: 14,
    color: colors.textPrimary,
    textTransform: "capitalize",
  },
  filterTextActive: { color: colors.buttonText },
  createButton: {
    margin: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignSelf: "center",
  },
  createButtonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },
  button: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  cancelButton: { backgroundColor: colors.errorBackground },
  submitButton: { backgroundColor: colors.primary },
  buttonText: { color: colors.buttonText, fontWeight: "600" },
});
