import { TextField } from "../../../components/TextInput";
import { Button, View, ScrollView  } from 'react-native'
import { useForm, useFieldArray } from 'react-hook-form'
import { object, string, array } from 'yup';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { uid } from 'uid';
import { LoadingModal } from '../../../components/LoadingModal';
import { useStorage } from '../../../hooks/useStorage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton, Text } from 'react-native-paper';
import { Container } from '../../../global/styles/globalComponents';

import * as S from './styles'

const schema = object({
    question: string()
    .required('O campo de título da questão não pode ser vazio.'),
    correct_answer: string()
    .required('O campo de resposta correta não pode ser vazio.'),
    answers: array()
    .of(Yup.mixed().test('is-string-or-object', 'Alternativa não pode ser vazio.', (value) => {
        if (typeof value === 'string') {
          return value.trim() !== '';
        } else if (typeof value === 'object') {
          return Object.keys(value).length !== 0;
        }
        return false;
      })).min(1, 'É necessário inserir pelo menos uma alternativa.') // Ensure at least one item in the array
      .required('É necessário inserir pelo menos uma alternativa.'),
})

export function CreateQuestion({ route }){
    const params = route.params;
    const { addQuestion, loading} = useStorage()
    const { register, setValue, handleSubmit, formState:{ errors }, control } = useForm({
        resolver: yupResolver(schema)
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'answers',
    });

    const { goBack, navigate } = useNavigation();

    const [correctAnswer, setCorrectAnswer] = useState()

    useEffect(() => {
        register('question')
        register('correct_answer')
    }, [register])

    async function onSubmit(data){
        const question = {
            id: uid(),
            ...data,
            subjects: params?.id_subject ? [params?.id_subject] : []
        }

        await addQuestion(question)

        if(params?.id_subject){
            navigate('subject_details', {id: params?.id_subject})
        }else{
            goBack()
        }
    }

    return(
        <Container>
            <ScrollView style={{ flex: 1 }}>
            <LoadingModal isVisible={loading} />
            <TextField 
                label={'Questão'}
                error={errors?.question}
                placeholder={'Ex.: Qual a capital do Brasil?'}
                onChangeText={text => setValue('question', text)}
            />
            <S.AnswersContainer>
                <S.AnswersHeader>
                    <S.Label>Alternativas</S.Label>
                    <S.AddAnswerButton
                        onPress={() => {
                            append({})
                        }}
                    >
                        <AntDesign name="plus" size={12} color="black" />
                    </S.AddAnswerButton>
                </S.AnswersHeader>
                
                <S.ErrorMessage>{errors?.answers?.message}</S.ErrorMessage>
                {fields.map((field, index) => {
                    return(
                        <View key={field.id}>
                            <TextField 
                                label={`Alternativa #${index+1}`}
                                onChangeText={text => setValue(`answers[${index}]`, text)}
                                error={errors?.answers?.[index]}
                            />
                            <S.DeleteAnswerButton
                                onPress={() => {
                                    remove(index)
                                }}
                            >
                                <AntDesign name="minus" size={12} color="black" />
                            </S.DeleteAnswerButton>
                        </View>
                    )
                })}
            </S.AnswersContainer>

                <RadioButton.Group onValueChange={newValue => {setValue('correct_answer', newValue); setCorrectAnswer(newValue)}} value={correctAnswer}>
                    <S.Label>Alternativa correta</S.Label>
                    <S.CorrectAnswerContainer>
                        {fields.map((field, index) => {
                            return(
                                <S.RadioButtonContainer key={`${field.id}-radio_button`}>
                                    <Text>#{index+1}</Text>
                                    <RadioButton value={index} />
                                </S.RadioButtonContainer>
                            )
                        })}
                    </S.CorrectAnswerContainer>
                    <S.ErrorMessage>{errors?.correct_answer?.message}</S.ErrorMessage>
                </RadioButton.Group>

            <Button   
                onPress={handleSubmit(onSubmit)}
                title="Criar Questão"
                color="#1969d3"
            />
            </ScrollView>
        </Container>
    )
}