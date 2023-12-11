import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native';
import { TimePicker } from 'react-native-simple-time-picker';
import { useTheme } from 'styled-components';
import { number, object, string, array, mixed } from 'yup';

import * as S from './styles';
import { DropdownSelect } from '../../../../components/DropdownSelect';
import { LoadingModal } from '../../../../components/LoadingModal';
import { TextField } from '../../../../components/TextInput';
import { Label } from '../../../../global/styles/globalComponents';
import { useStorage } from '../../../../hooks/useStorage';

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

export function ExamForm({ sendData, exam }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const [valueDropdown, setValueDropdown] = useState(exam ? exam.examType : 'no_time');
  const [dropDownItems, setDropDownItems] = useState([
    { label: 'Sem tempo', value: 'no_time' },
    { label: 'Tempo único', value: 'overall_time' },
    { label: 'Tempo por questão', value: 'question_time' },
  ]);

  const [subjectItems, setSubjectItems] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState(exam ? exam.subjects : null);

  const [hours, setHours] = useState(exam ? Number(exam.hour) : 0);
  const [minutes, setMinutes] = useState(exam ? Number(exam.minute) : 1);

  const { fetchSubjects } = useStorage();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: exam ? exam.title : '',
      description: exam ? exam.description : '',
      examType: exam ? exam.examType : '',
      subjects: exam ? exam.subjects : [],
      hour: exam ? exam.hour : '',
      minute: exam ? exam.minute : '',
    },
  });

  useEffect(() => {
    register('title');
    register('description');
    register('examType');
    register('subjects');
    register('hour');
    register('minute');

    setValue('examType', valueDropdown);
    setValue('hour', hours);
    setValue('minute', minutes);
  }, [register]);

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

    setLoading(true);
    fetchSubjectsItems();
    setLoading(false);
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
    setValue('subjects', subjectsSelected);
  }, [subjectsSelected]);

  async function onSubmit(data) {
    await sendData(data);
  }

  return (
    <>
      <LoadingModal isVisible={loading} />
      <S.FormContainer>
        <TextField
          label="Título"
          error={errors?.title}
          placeholder="Ex.: ENEM"
          onChangeText={(text) => setValue('title', text)}
          defaultValue={getValues('title')}
        />
        <TextField
          label="Descrição"
          error={errors?.description}
          placeholder="Ex.: Simulado para estudo ENEM"
          onChangeText={(text) => setValue('description', text)}
          defaultValue={getValues('description')}
        />

        <S.DropdownFieldContainer>
          <Label>Tipo de simulado</Label>
          <DropdownSelect
            value={valueDropdown}
            setValue={(value) => handleChangeExamType(value)}
            values={dropDownItems}
            closeAfterSelecting
            setItems={setDropDownItems}
          />

          {(valueDropdown === 'overall_time' || valueDropdown === 'question_time') && (
            <>
              <Label>
                {valueDropdown === 'overall_time' ? 'Tempo do simulado' : 'Tempo de cada questão'}
              </Label>
              <S.TimeInput>
                <TimePicker value={{ hours, minutes }} onChange={handleChangeTime} />
              </S.TimeInput>
              <S.ErrorMessage>{errors?.hour?.message}</S.ErrorMessage>
              <S.ErrorMessage>{errors?.minute?.message}</S.ErrorMessage>
            </>
          )}
        </S.DropdownFieldContainer>

        <S.DropdownFieldContainer>
          <Label>Matérias</Label>
          <DropdownSelect
            value={subjectsSelected}
            setValue={setSubjectsSelected}
            values={subjectItems}
            setItems={setSubjectItems}
            error={!!errors?.subjects?.message}
            multiple
            zIndex={3000}
            zIndexInverse={1000}
            placeholder="Selecione múltiplos itens"
          />
          <S.ErrorMessage>{errors?.subjects?.message}</S.ErrorMessage>
        </S.DropdownFieldContainer>

        <S.ButtonContainer>
          <Button
            onPress={handleSubmit(onSubmit)}
            title={exam ? 'Salvar Simulado' : 'Criar Simulado'}
            color={theme.colors.primary}
          />
        </S.ButtonContainer>
      </S.FormContainer>
    </>
  );
}
