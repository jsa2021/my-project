App de Gestión de Turnos

App en React Native (Expo) con React Navigation y Redux Toolkit/RTK Query. 
Sincroniza pacientes desde Firebase Realtime Database (gestionados externamente) y 
Gestiona de forma offline los turnos con SQLite y permite un CRUD completo 
(crear, consultar, actualizar y eliminar citas). 
Integra Firebase Authentication para gestionar el registro e inicio de sesión 
mediante correo electrónico y contraseña. La foto de perfil (string Base64) 
se guarda en RTDB y el usuario puede cambiarla desde la app. Permite cerrar sesión, 
limpiando los datos de la sesión local y regresando a la pantalla de login.


Funcionalidades

- Registro y login de usuarios mediante Firebase Auth.
- Panel de control para turnos del día, próximos eventos.
- Visualización y búsqueda de pacientes y sus turnos asignados.
- Asignación y gestión de turnos.
- Registro local con SQLite, persistir localmente sesiones y turnos, asegurando disponibilidad offline.
- Sincronización con Firebase Realtime Database de pacientes
- Navegación por pestañas entre secciones principales (Inicio, Calendario, Opciones)
- Permite agregar y modificar la foto de perfil del usuario 
- Al cerrar sesión, elimina la sesión local y redirige automáticamente al usuario a la pantalla de login.


Tecnologías y librerías utilizadas

React Native - Framework base para desarrollar la app en dispositivos móviles
Expo - Entorno de desarrollo más ágil para apps con React Native
Redux Toolkit - Gestión del estado global (usuarios, pacientes, eventos)
React-Redux - Conexión de React Native con Redux
RTK Query - Consultas automáticas a Firebase desde Redux
Firebase (firebase) - SDK de Firebase para Auth y Realtime DB
Firebase Authentication - Registro e inicio de sesión por email/contraseña
Firebase Realtime Database - Sincronización de pacientes y foto de perfil
Expo-SQLite (expo-sqlite) - Persistencia local de sesiones y turnos
React Navigation - Navegación stack y pestañas
Expo Image Picker - Captura de imagen para foto de perfil
react-native-calendars - Componentes de calendario para visualización y selección de fechas
react-native-dropdown-picker - Selector desplegable personalizado
react-native-modal-datetime-picker - Selector de fecha/hora en modal con mejor UX
react-native-safe-area-context - Manejo de safe areas en iOS y Android
react-native-screens - Optimización de pantallas para React Navigation
yup - Validación de formularios
@expo/vector-icons - Iconos de UI (pestañas, cámara, etc.)
@react-native-community/datetimepicker - Selector nativo de fecha y hora para edición de turnos
@react-native-picker/picker - Dropdown nativo para elegir paciente o tipo de turno
@react-navigation/bottom-tabs - Navegación en pestañas (TabNavigator)
@react-navigation/native-stack - Navegación de pila (AuthNavigator, MainNavigator)




Instalación y puesta a punto

1. Clonar el repositorio:

git clone https://github.com/usuario/proyecto-clinica.git
cd proyecto-clinica

2. Instalar dependencias:

npm install

3. Configurar Firebase:

Crear un archivo `.env` en la raíz del proyecto con tus claves:

EXPO_PUBLIC_API_KEY=TU_API_KEY
EXPO_PUBLIC_BASE_RTDB_URL=https://TU_PROJECTO.firebaseio.com
EXPO_PUBLIC_AUTH_BASE_URL=https://identitytoolkit.googleapis.com/v1/

Estas claves se obtienen desde la consola de Firebase.

4. Ejecutar la aplicación:

npx expo start

Escaneá el código QR desde tu dispositivo con Expo Go.


Estructura de carpetas

src/
├── components/        # Componentes reutilizables
├── db/                # Inicialización y consultas SQLite
├── features/          # Redux slices y lógica de estado
├── global/            # Variables globales
├── navigation/        # Configuración de navegadores
├── screens/           # Vistas de la aplicación
├── services/          # RTK Query APIs para Firebase
├── store/             # Store de Redux Toolkit
└── utils/             # Helpers genéricos


Próximas mejoras


- Estadísticas y graficos
- Soporte para notificaciones push
- Backup de turnos en Firebase

Autores

Desarrollado por JSA.
