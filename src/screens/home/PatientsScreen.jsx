import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useGetPacientesQuery } from "../../services/patientsApi";
import {
  setFilter,
  selectFilteredPacientes,
} from "../../features/patientsSlice";
import Card from "../../components/Card";
import Search from "../../components/Search";
import NavLink from "../../components/NavLink";
import { colors } from "../../global/colors";
import { useNavigation } from "@react-navigation/native";

export default function PatientsScreen() {
  const dispatch = useDispatch();
  
  const { isLoading, isError } = useGetPacientesQuery();
  const navigation = useNavigation();


  const filtro = useSelector((state) => state.patients.filter);
  const filteredPacientes = useSelector(selectFilteredPacientes);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar pacientes.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("PatientDetailScreen", { patientId: item.id })
      }
    >
      <Card>
        <View style={styles.info}>
          <Text style={styles.nombre}>
            {item.nombre}, {item.edad} años
          </Text>
          <Text style={styles.more}>Ver más información →</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <NavLink back label="← Volver" />

      <Search
        keyword={filtro}
        setKeyword={(text) => dispatch(setFilter(text))}
      />

      <FlatList
        data={filteredPacientes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron pacientes.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.Mainbackground,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingVertical: 8,
  },
  info: {
    flex: 1,
    marginRight: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  more: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  telefono: {
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.errorText,
    backgroundColor: colors.errorBackground,
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
});
