import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPacientesQuery } from '../../services/patientsApi';
import { colors } from '../../global/colors';
import NavLink from '../../components/NavLink';
import PatientsCard from '../../components/home/PatientsCard';
import EventsCard from '../../components/home/EventsCard';
import DailyInfoCard from '../../components/home/DailyInfoCard';
import { initEventsTableDB, getEventsByEmailDB } from '../../db';
import { loadEvents } from '../../features/eventsSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.userEmail);
  const profilePicture = useSelector((state) => state.user.profilePicture);

 
  const { isLoading: loadingPatients, isError: errorPatients } = useGetPacientesQuery();

  
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState(false);

  useEffect(() => {
    let mounted = true;
    initEventsTableDB()
      .then(() => getEventsByEmailDB(userEmail))
      .then((events) => {
        if (mounted) {
          dispatch(loadEvents(events));
          setLoadingEvents(false);
        }
      })
      .catch((err) => {
        console.error('Error BD events:', err);
        if (mounted) {
          setErrorEvents(true);
          setLoadingEvents(false);
        }
      });
    return () => { mounted = false; };
  }, [userEmail, dispatch]);

 
  const patients = useSelector((state) => state.patients.list) || [];
  const events = useSelector((state) => state.events.list) || [];

  const patientsCount = patients.length;

  const today = new Date();
  const todayFormatted = today.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (loadingPatients || loadingEvents) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (errorPatients || errorEvents) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar datos.</Text>
      </View>
    );
  }

  const upcoming = events
    .map(e => ({ ...e, startDate: new Date(e.start) }))
    .filter(e => e.startDate >= today)
    .sort((a, b) => a.startDate - b.startDate);
  const nextAppointment = upcoming[0] || null;

  return (
    <View style={styles.screen}>
          <NavLink to="PatientsScreen" label="Administrar Pacientes →" />
          <ScrollView
      
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userInfo}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
        <Text style={styles.emailText}>{userEmail}</Text>
      </View>



      <View style={styles.dashboard}>
        <PatientsCard count={patientsCount} />
      <EventsCard events={events}/>
        <DailyInfoCard
          todayFormatted={todayFormatted}
          nextAppointment={nextAppointment}
        />
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.background,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 8,
  },
  emailText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.errorText,
    backgroundColor: colors.errorBackground,
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
});
