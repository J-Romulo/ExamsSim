import { MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useTheme } from 'styled-components';

import { SearchBar } from '../components/SearchBar';
import { useDialogModal } from '../hooks/useDialogModal';
import { useStorage } from '../hooks/useStorage';
import { Exams } from '../pages/Exams';
import { CreateExam } from '../pages/Exams/CreateExam';
import { ExamDetails } from '../pages/Exams/ExamDetails';
import { SimulateExam } from '../pages/Exams/SimulateExam';
import { Questions } from '../pages/Questions';
import { CreateQuestion } from '../pages/Questions/CreateQuestion';
import { EditQuestion } from '../pages/Questions/EditQuestion';
import { QuestionDetails } from '../pages/Questions/QuestionDetails';
import { Settings } from '../pages/Settings';
import { Subjects } from '../pages/Subjects';
import { CreateSubject } from '../pages/Subjects/CreateSubject';
import { EditSubject } from '../pages/Subjects/EditSubject';
import { SubjectDetails } from '../pages/Subjects/SubjectDetails';

const SettingsStack = createNativeStackNavigator();
const SubjectsStack = createNativeStackNavigator();
const ExamsStack = createNativeStackNavigator();
const QuestionsStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function SubjectsScreens() {
  const theme = useTheme();
  const { openTwoOptionsModal } = useDialogModal();
  const { deleteSubject } = useStorage();
  const { navigate } = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);

  function deleteSubjectById(subject_id) {
    setMenuOpened(false);
    openTwoOptionsModal(
      'Tem certeza que deseja excluir permanentemente a matéria?',
      'Sim',
      'Cancelar',
      async () => {
        await deleteSubject(subject_id);
        navigate('subjects');
      }
    );
  }

  return (
    <SubjectsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.nav_background,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SubjectsStack.Screen
        options={() => ({
          headerTitle: 'Matérias',
          headerRight: () => (
            <SearchBar setText={setSearchText} placeholder="Procure pela matéria..." />
          ),
        })}
        name="subjects">
        {() => <Subjects searchText={searchText} />}
      </SubjectsStack.Screen>

      <SubjectsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Criar Matéria',
        })}
        name="create_subject"
        component={CreateSubject}
      />

      <SubjectsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Editar Matéria',
        })}
        name="edit_subject"
        component={EditSubject}
      />

      <SubjectsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Criar Questão',
        })}
        name="create_question_subject"
        component={CreateQuestion}
      />

      <SubjectsStack.Screen
        options={({ route, navigation }) => ({
          headerShown: true,
          headerTitle: 'Detalhamento de matéria',
          headerRight: () => {
            return (
              <View>
                <Menu
                  style={{ backgroundColor: theme.colors.background_surface }}
                  visible={menuOpened}
                  anchor={
                    <TouchableOpacity onPress={() => setMenuOpened(true)}>
                      <Entypo name="dots-three-vertical" size={22} color="white" />
                    </TouchableOpacity>
                  }
                  onRequestClose={() => setMenuOpened(false)}>
                  <MenuItem
                    onPress={() => navigation.navigate('edit_subject', { id: route.params.id })}>
                    Editar
                  </MenuItem>
                  <MenuItem onPress={() => deleteSubjectById(route.params.id)}>
                    Excluir matéria
                  </MenuItem>
                </Menu>
              </View>
            );
          },
        })}
        name="subject_details"
        component={SubjectDetails}
      />

      <SubjectsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Detalhamento de questão',
        })}
        name="question_details_subject"
        component={QuestionDetails}
      />

      <SubjectsStack.Screen
        options={() => ({
          headerTitle: 'Questões',
          headerRight: () => (
            <SearchBar setText={setSearchText} placeholder="Procure pela questão..." />
          ),
        })}
        name="questions">
        {({ route }) => <Questions searchText={searchText} route={route} />}
      </SubjectsStack.Screen>
    </SubjectsStack.Navigator>
  );
}

function QuestionsScreens() {
  const theme = useTheme();
  const { openTwoOptionsModal } = useDialogModal();
  const { deleteQuestion, deleteSubject } = useStorage();
  const { navigate } = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);

  function deleteQuestionById(question_id) {
    setMenuOpened(false);
    openTwoOptionsModal(
      'Tem certeza que deseja excluir permanentemente a questão?',
      'Sim',
      'Cancelar',
      async () => {
        await deleteQuestion(question_id);
        navigate('questions');
      }
    );
  }

  function deleteSubjectById(subject_id) {
    setMenuOpened(false);
    openTwoOptionsModal(
      'Tem certeza que deseja excluir permanentemente a matéria?',
      'Sim',
      'Cancelar',
      async () => {
        await deleteSubject(subject_id);
        navigate('subjects');
      }
    );
  }

  return (
    <QuestionsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.nav_background,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <QuestionsStack.Screen
        options={() => ({
          headerTitle: 'Questões',
          headerRight: () => (
            <SearchBar setText={setSearchText} placeholder="Procure pela questão..." />
          ),
        })}
        name="questions">
        {() => <Questions searchText={searchText} />}
      </QuestionsStack.Screen>
      <QuestionsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Criar Questão',
        })}
        name="create_question"
        component={CreateQuestion}
      />

      <QuestionsStack.Screen
        options={({ route, navigation }) => ({
          headerShown: true,
          headerTitle: 'Detalhamento de questão',
          headerRight: () => {
            return (
              <View>
                <Menu
                  style={{ backgroundColor: theme.colors.background_surface }}
                  visible={menuOpened}
                  anchor={
                    <TouchableOpacity onPress={() => setMenuOpened(true)}>
                      <Entypo name="dots-three-vertical" size={22} color="white" />
                    </TouchableOpacity>
                  }
                  onRequestClose={() => setMenuOpened(false)}>
                  <MenuItem
                    onPress={() => navigation.navigate('edit_question', { id: route.params.id })}>
                    Editar
                  </MenuItem>
                  <MenuItem onPress={() => deleteQuestionById(route.params.id)}>
                    Excluir questão
                  </MenuItem>
                </Menu>
              </View>
            );
          },
        })}
        name="question_details"
        component={QuestionDetails}
      />

      <QuestionsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Editar Questão',
        })}
        name="edit_question"
        component={EditQuestion}
      />

      <QuestionsStack.Screen
        options={({ route, navigation }) => ({
          headerShown: true,
          headerTitle: 'Detalhamento de matéria',
          headerRight: () => {
            return (
              <View>
                <Menu
                  style={{ backgroundColor: theme.colors.background_surface }}
                  visible={menuOpened}
                  anchor={
                    <TouchableOpacity onPress={() => setMenuOpened(true)}>
                      <Entypo name="dots-three-vertical" size={22} color="white" />
                    </TouchableOpacity>
                  }
                  onRequestClose={() => setMenuOpened(false)}>
                  <MenuItem
                    onPress={() => navigation.navigate('edit_subject', { id: route.params.id })}>
                    Editar
                  </MenuItem>
                  <MenuItem onPress={() => deleteSubjectById(route.params.id)}>
                    Excluir matéria
                  </MenuItem>
                </Menu>
              </View>
            );
          },
        })}
        name="subject_details"
        component={SubjectDetails}
      />
    </QuestionsStack.Navigator>
  );
}

function ExamsScreens() {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);

  const { openTwoOptionsModal } = useDialogModal();
  const { deleteExam } = useStorage();
  const { navigate } = useNavigation();

  function deleteExamById(exam_id) {
    setMenuOpened(false);
    openTwoOptionsModal(
      'Tem certeza que deseja excluir permanentemente o simulado?',
      'Sim',
      'Cancelar',
      async () => {
        await deleteExam(exam_id);
        navigate('exams');
      }
    );
  }

  return (
    <ExamsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.nav_background,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ExamsStack.Screen
        options={() => ({
          headerTitle: 'Simulados',
          headerRight: () => (
            <SearchBar setText={setSearchText} placeholder="Procure pelo simulado..." />
          ),
        })}
        name="exams">
        {() => <Exams searchText={searchText} />}
      </ExamsStack.Screen>
      <ExamsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Criar simulado',
        })}
        name="create_exam"
        component={CreateExam}
      />
      <ExamsStack.Screen
        options={() => ({
          headerShown: false,
          headerTitle: 'Simulado',
        })}
        name="simulate_exam"
        component={SimulateExam}
      />
      <ExamsStack.Screen
        options={({ route, navigation }) => ({
          headerShown: true,
          headerTitle: 'Detalhamento do simulado',
          headerRight: () => {
            return (
              <View>
                <Menu
                  style={{ backgroundColor: theme.colors.background_surface }}
                  visible={menuOpened}
                  anchor={
                    <TouchableOpacity onPress={() => setMenuOpened(true)}>
                      <Entypo name="dots-three-vertical" size={22} color="white" />
                    </TouchableOpacity>
                  }
                  onRequestClose={() => setMenuOpened(false)}>
                  <MenuItem
                    onPress={() => navigation.navigate('edit_subject', { id: route.params.id })}>
                    Editar
                  </MenuItem>
                  <MenuItem onPress={() => deleteExamById(route.params.id)}>
                    Excluir simulado
                  </MenuItem>
                </Menu>
              </View>
            );
          },
        })}
        name="exam_details"
        component={ExamDetails}
      />
    </ExamsStack.Navigator>
  );
}

function SettingsScreens() {
  const theme = useTheme();
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.nav_background,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ExamsStack.Screen name="Configurações" component={Settings} />
    </SettingsStack.Navigator>
  );
}

export default function AppRoutes() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.nav_background,
        tabBarInactiveTintColor: 'whitesmoke',
        tabBarActiveBackgroundColor: theme.colors.background_surface,
        tabBarInactiveBackgroundColor: theme.colors.nav_background,
        tabBarStyle: {
          height: 60,
          borderColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          marginTop: -10,
          marginBottom: 10,
        },
      }}>
      <Tab.Screen
        name="simulados_screens"
        component={ExamsScreens}
        options={{
          headerShown: false,
          tabBarLabel: 'Simulados',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper-variant-multiple-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="materias_screens"
        component={SubjectsScreens}
        options={{
          headerShown: false,
          tabBarLabel: 'Matérias',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="question-answer" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="questions_screens"
        component={QuestionsScreens}
        options={{
          headerShown: false,
          tabBarLabel: 'Questões',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="frequently-asked-questions" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="configuracoes_screens"
        component={SettingsScreens}
        options={{
          headerShown: false,
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
