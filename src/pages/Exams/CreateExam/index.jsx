import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native';
import { TimePicker } from 'react-native-simple-time-picker';
import { uid } from 'uid';
import { number, object, string, array, mixed } from 'yup';

import * as S from './styles';
import { DropdownSelect } from '../../../components/DropdownSelect';
import { LoadingModal } from '../../../components/LoadingModal';
import { TextField } from '../../../components/TextInput';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';

const schema = object({
  title: string().required('O campo de título não pode ser vazio.'),
  description: string().required('O campo de descrição não pode ser vazio.'),
  examType: string().required('O simulado deve ser de alguma categoria de tempo.'),
  hour: number().notRequired(),
  minute: number().notRequired(),
  subjects: array()
    .of(
      mixed().test('is-string-or-object', 'Questões não pode ser vazio.', (value) => {
        if (typeof value === 'string') {
          return value.trim() !== '';
        } else if (typeof value === 'object') {
          return Object.keys(value).length !== 0;
        }
        return false;
      })
    )
    .min(1, 'É necessário inserir pelo menos uma matéria.') // Ensure at least one item in the array
    .required('É necessário inserir pelo menos uma matéria.'),
});

export function CreateExam() {
  const [valueDropdown, setValueDropdown] = useState('no_time');
  const [dropDownItems, setDropDownItems] = useState([
    { label: 'Sem tempo', value: 'no_time' },
    { label: 'Tempo único', value: 'overall_time' },
    { label: 'Tempo por questão', value: 'question_time' },
  ]);

  const [subjectItems, setSubjectItems] = useState([]);
  const [valueSubject, setValueSubject] = useState(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);

  const { fetchSubjects, addExam, loading } = useStorage();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { dispatch } = useNavigation();

  useEffect(() => {
    register('title');
    register('description');
    register('examType');
    register('subjects');
    register('hour');
    register('minute');

    setValue('examType', valueDropdown);
    setValue('hour', 0);
    setValue('minute', 0);
  }, [register]);

  async function onSubmit(data) {
    const exam = {
      id: uid(),
      ...data,
    };

    await addExam(exam);

    dispatch(StackActions.replace('simulate_exam', { id: exam.id }));
  }

  useEffect(() => {
    async function fetchSubjectsItems() {
      const subjects = await fetchSubjects();

      const subjects_parsed = subjects.map((subject) => {
        return {
          label: subject.title,
          value: subject.title,
        };
      });

      setSubjectItems(subjects_parsed);
    }

    fetchSubjectsItems();
  }, []);

  function handleChangeTime(values) {
    const { hours, minutes } = values;
    setHours(hours);
    setMinutes(minutes);

    setValue('hour', hours);
    setValue('minute', minutes);
  }

  function handleChangeExamType(value) {
    setValueDropdown(value());
    setValue('examType', value());
  }

  useEffect(() => {
    setValue('subjects', valueSubject);
  }, [valueSubject]);

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <S.FormContainer>
        <TextField
          label="Título"
          error={errors?.title}
          placeholder="Ex.: ENEM"
          onChangeText={(text) => setValue('title', text)}
        />
        <TextField
          label="Descrição"
          error={errors?.description}
          placeholder="Ex.: Simulado para estudo ENEM"
          onChangeText={(text) => setValue('description', text)}
        />

        <S.Label>Tipo de simulado</S.Label>
        <DropdownSelect
          value={valueDropdown}
          setValue={(value) => handleChangeExamType(value)}
          values={dropDownItems}
          setItems={setDropDownItems}
        />

        {(valueDropdown === 'overall_time' || valueDropdown === 'question_time') && (
          <>
            <S.Label>
              {valueDropdown === 'overall_time' ? 'Tempo do simulado' : 'Tempo de cada questão'}
            </S.Label>
            <S.TimeInput>
              <TimePicker hours={hours} minutes={minutes} onChange={handleChangeTime} />
            </S.TimeInput>
            <S.ErrorMessage>{errors?.hour?.message}</S.ErrorMessage>
            <S.ErrorMessage>{errors?.minute?.message}</S.ErrorMessage>
          </>
        )}

        <S.Label>Questões</S.Label>
        <DropdownSelect
          value={valueSubject}
          setValue={setValueSubject}
          values={subjectItems}
          setItems={setSubjectItems}
          multiple
          zIndex={3000}
          zIndexInverse={1000}
          placeholder="Selecione múltiplos itens"
        />
        <S.ErrorMessage>{errors?.subjects?.message}</S.ErrorMessage>

        <S.ButtonContainer>
          <Button onPress={handleSubmit(onSubmit)} title="Criar simulado" color="#1969d3" />
        </S.ButtonContainer>
      </S.FormContainer>
    </Container>
  );
}
