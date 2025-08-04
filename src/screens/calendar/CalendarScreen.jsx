import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { colors } from '../../global/colors';
import NavLink from '../../components/NavLink';
import '../../utils/calendarLocale';

export default function CalendarScreen() {
  const navigation = useNavigation();
  const events = useSelector(state => state.events.list || []);


  const markedDates = events.reduce((acc, evt) => {
    const date = new Date(evt.start)
      .toISOString()
      .slice(0, 10);
    acc[date] = { marked: true, dotColor: colors.primary };
    return acc;
  }, {});

  return (
    <View style={styles.screen}>

         <NavLink to="EventScreen" label="Administrar Turnos →" />
            
               <View style={styles.dashboard}>
      <Calendar
       
        markedDates={markedDates}
         style={styles.calendar}
        onDayPress={day => {
          const fechaISO = day.dateString; 
          const turnoDelDia = events.find(evt =>
            evt.start.startsWith(fechaISO)
          );
          if (turnoDelDia) {
            navigation.navigate('EventScreen', { event: turnoDelDia });
          }
        }}

    
        theme={{
          selectedDayBackgroundColor: colors.primary,
          todayTextColor: colors.primary,
          dotColor: colors.primary,
          arrowColor: colors.primary
        }}
      />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.Mainbackground,
  },
    dashboard: {
    alignContent: 'center',
    justifyContent: 'space-between',
     padding: 32,
  },
    calendar: {
    fontSize: 16,
    backgroundColor:  colors.background
  }
});
