import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Exams } from '../pages/Exams';
import { Subjects } from '../pages/Subjects';
import { CreateSubject } from '../pages/Subjects/CreateSubject';
import { SubjectDetails } from '../pages/Subjects/SubjectDetails';
import { CreateQuestion } from '../pages/Questions/CreateQuestion';
import { Questions } from '../pages/Questions';
import { QuestionDetails } from '../pages/Questions/QuestionDetails';
import React from 'react';
import { CreateExam } from '../pages/Exams/CreateExam';
import { SimulateExam } from '../pages/Exams/SimulateExam';

const SettingsStack = createNativeStackNavigator();
const SubjectsStack = createNativeStackNavigator();
const ExamsStack = createNativeStackNavigator();
const QuestionsStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function Compt(){
    return(
        <View>
            <Text>Teste</Text>
        </View>
    )
}

function SubjectsScreens(){
    return(
        <SubjectsStack.Navigator>
            <SubjectsStack.Screen name="Matérias" component={Subjects} />
            <SubjectsStack.Screen         
                options={() => ({
                    headerShown: true,
                    headerTitle: 'Criar Matéria',
                })}
                name="create_subject" component={CreateSubject} 
            />
            <SubjectsStack.Screen         
                options={() => ({
                    headerShown: true,
                    headerTitle: 'Detalhamento de matéria',
                })}
                name="subject_details" component={SubjectDetails} 
            />
        </SubjectsStack.Navigator>
    )
}

function QuestionsScreens(){
    return(
        <QuestionsStack.Navigator>
            <QuestionsStack.Screen name="Questões" component={Questions} />
            <QuestionsStack.Screen options={() => ({
                    headerShown: true,
                    headerTitle: 'Criar Questão',
                })}
                name="create_question" component={CreateQuestion} 
            />
            <QuestionsStack.Screen         
                options={() => ({
                    headerShown: true,
                    headerTitle: 'Detalhamento de questão',
                })}
                name="question_details" component={QuestionDetails} 
            />
        </QuestionsStack.Navigator>
    )
}

function ExamsScreens(){
    return(
        <ExamsStack.Navigator>
            <ExamsStack.Screen name="Simulados" component={Exams} />
            <ExamsStack.Screen options={() => ({
                    headerShown: true,
                    headerTitle: 'Criar simulado',
                })}
                name="create_exam" component={CreateExam} 
            />
            <ExamsStack.Screen         
                options={() => ({
                    headerShown: true,
                    headerTitle: 'Simulado',
                })}
                name="simulate_exam" component={SimulateExam} 
            />
        </ExamsStack.Navigator>
    )
}

function SettingsScreens(){
    return(
        <SettingsStack.Navigator>
            <ExamsStack.Screen name="Configurações" component={Compt} />
        </SettingsStack.Navigator>
    )
}

export default function AppRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="simulados_screens" component={ExamsScreens} 
                options={{
                    headerShown: false,
                    tabBarLabel: 'Simulados',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="newspaper-variant-multiple-outline" size={size} color={color}/>
                    ),
                }}
            />
            <Tab.Screen name="materias_screens" component={SubjectsScreens} 
                options={{
                    headerShown: false,
                    tabBarLabel: 'Matérias',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="question-answer" size={size} color={color}/>
                    ),
                }}
            />
            <Tab.Screen name="questions_screens" component={QuestionsScreens} 
                options={{
                    headerShown: false,
                    tabBarLabel: 'Questões',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="frequently-asked-questions" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="configuracoes_screens" component={SettingsScreens} 
                options={{
                    headerShown: false,
                    tabBarLabel: 'Configurações',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}