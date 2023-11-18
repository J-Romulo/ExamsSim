import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { SearchBar } from '../components/SearchBar';
import { Exams } from '../pages/Exams';
import { CreateExam } from '../pages/Exams/CreateExam';
import { SimulateExam } from '../pages/Exams/SimulateExam';
import { Questions } from '../pages/Questions';
import { CreateQuestion } from '../pages/Questions/CreateQuestion';
import { QuestionDetails } from '../pages/Questions/QuestionDetails';
import { Subjects } from '../pages/Subjects';
import { CreateSubject } from '../pages/Subjects/CreateSubject';
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
  const [searchText, setSearchText] = useState('');

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
          headerRight: () => <SearchBar setText={setSearchText} />,
        })}
        name="Matérias">
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
          headerTitle: 'Criar Questão',
        })}
        name="create_question_subject"
        component={CreateQuestion}
      />
      <SubjectsStack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Detalhamento de matéria',
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
  const [searchText, setSearchText] = useState('');

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
          headerRight: () => <SearchBar setText={setSearchText} />,
        })}
        name="Questões">
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
        options={() => ({
          headerShown: true,
          headerTitle: 'Detalhamento de questão',
        })}
        name="question_details"
        component={QuestionDetails}
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
