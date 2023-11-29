import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button, View, ScrollView } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import * as Yup from 'yup';
import { object, string, array } from 'yup';

import * as S from './styles';
import { TextField } from '../../../../components/TextInput';
import { DeleteButton } from '../../../../global/styles/globalComponents';

const schema = object({
  question: string().required('O campo de título da questão não pode ser vazio.'),
  correct_answer: string().required('O campo de resposta correta não pode ser vazio.'),
  answers: array()
    .of(
      Yup.mixed().test('is-string-or-object', 'Alternativa não pode ser vazio.', (value) => {
        if (typeof value === 'string') {
          return value.trim() !== '';
        } else if (typeof value === 'object') {
          return Object.keys(value).length !== 0;
        }
        return false;
      })
    )
    .min(1, 'É necessário inserir pelo menos uma alternativa.') // Ensure at least one item in the array
    .required('É necessário inserir pelo menos uma alternativa.'),
});

export function QuestionForm({ sendData, question }) {
  const [correctAnswer, setCorrectAnswer] = useState();

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      question: question ? question.question : '',
      correct_answer: question ? question.correct_answer : '',
      answers: question ? question.answers : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  });

  useEffect(() => {
    register('question');
    register('correct_answer');
  }, [register]);

  async function onSubmit(data) {
    await sendData(data);
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <TextField
          label="Questão"
          error={errors?.question}
          placeholder="Ex.: Qual a capital do Brasil?"
          onChangeText={(text) => setValue('question', text)}
          defaultValue={getValues('question')}
        />
        <S.AnswersContainer>
          <S.AnswersHeader>
            <S.Label>Alternativas</S.Label>
            <S.AddAnswerButton
              onPress={() => {
                append({});
              }}>
              <AntDesign name="plus" size={12} color="black" />
            </S.AddAnswerButton>
          </S.AnswersHeader>

          <S.ErrorMessage>{errors?.answers?.message}</S.ErrorMessage>
          {fields.map((field, index) => {
            return (
              <View key={field.id}>
                <TextField
                  label={`Alternativa #${index + 1}`}
                  onChangeText={(text) => setValue(`answers[${index}]`, text)}
                  error={errors?.answers?.[index]}
                  defaultValue={getValues(`answers[${index}]`)}
                />
                <DeleteButton
                  onPress={() => {
                    remove(index);
                  }}>
                  <AntDesign name="minus" size={12} color="black" />
                </DeleteButton>
              </View>
            );
          })}
        </S.AnswersContainer>

        <RadioButton.Group
          onValueChange={(newValue) => {
            setValue('correct_answer', newValue);
            setCorrectAnswer(newValue);
          }}
          value={correctAnswer}
          defaultValue="correct_answer">
          <S.Label>Alternativa correta</S.Label>
          <S.CorrectAnswerContainer>
            {fields.map((field, index) => {
              return (
                <S.RadioButtonContainer key={`${field.id}-radio_button`}>
                  <Text>#{index + 1}</Text>
                  <RadioButton value={index} />
                </S.RadioButtonContainer>
              );
            })}
          </S.CorrectAnswerContainer>
          <S.ErrorMessage>{errors?.correct_answer?.message}</S.ErrorMessage>
        </RadioButton.Group>
      </ScrollView>
      <S.ButtonContainer>
        <Button
          onPress={handleSubmit(onSubmit)}
          title={question ? 'Salvar Questão' : 'Criar Questão'}
          color="#1969d3"
        />
      </S.ButtonContainer>
    </>
  );
}
