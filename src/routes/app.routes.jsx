import { MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';

import { SearchBar } from '../components/SearchBar';
import { useDialogModal } from '../hooks/useDialogModal';
import { useStorage } from '../hooks/useStorage';
import { Exams } from '../pages/Exams';
import { CreateExam } from '../pages/Exams/CreateExam';
import { SimulateExam } from '../pages/Exams/SimulateExam';
import { Questions } from '../pages/Questions';
import { CreateQuestion } from '../pages/Questions/CreateQuestion';
import { EditQuestion } from '../pages/Questions/EditQuestion';
import { QuestionDetails } from '../pages/Questions/QuestionDetails';
import { Subjects } from '../pages/Subjects';
import { CreateSubject } from '../pages/Subjects/CreateSubject';
import { EditSubject } from '../pages/Subjects/EditSubject';
import { SubjectDetails } from '../pages/Subjects/SubjectDetails';

const SettingsStack = createNativeStackNavigator();
const SubjectsStack = createNativeStackNavigator();
const ExamsStack = createNativeStackNavigator();
const QuestionsStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function Compt() {
  return (
    <View>
      <Text>Teste</Text>
    </View>
  );
}

function SubjectsScreens() {
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
          backgroundColor: '#095FD9',
        },
        headerTintColor: '#fff',
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
    </SubjectsStack.Navigator>
  );
}

function QuestionsScreens() {
  const { openTwoOptionsModal } = useDialogModal();
  const { deleteQuestion } = useStorage();
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

  return (
    <QuestionsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#095FD9',
        },
        headerTintColor: '#fff',
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
    </QuestionsStack.Navigator>
  );
}

function ExamsScreens() {
  return (
    <ExamsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#095FD9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ExamsStack.Screen name="Simulados" component={Exams} />
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
    </ExamsStack.Navigator>
  );
}

function SettingsScreens() {
  return (
    <SettingsStack.Navigator>
      <ExamsStack.Screen name="Configurações" component={Compt} />
    </SettingsStack.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#095FD9',
        tabBarInactiveTintColor: '#FFF',
        tabBarActiveBackgroundColor: '#FFF',
        tabBarInactiveBackgroundColor: '#095FD9',
        tabBarStyle: {
          height: 60,
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
