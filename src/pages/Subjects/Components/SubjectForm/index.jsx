import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native';
import { object, string } from 'yup';

import { TextField } from '../../../../components/TextInput';

const schema = object({
  title: string().required('O campo de título não pode ser vazio.'),
  description: string().required('O campo de descrição não pode ser vazio.'),
});

export function SubjectForm({ sendData, subject }) {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: subject ? subject.title : '',
      description: subject ? subject.description : '',
    },
  });

  useEffect(() => {
    register('title');
    register('description');
  }, [register]);

  async function onSubmit(data) {
    await sendData(data);
  }

  return (
    <>
      <TextField
        label="Título"
        error={errors?.title}
        placeholder="Ex.: Português ENEM"
        onChangeText={(text) => setValue('title', text)}
        defaultValue={getValues('title')}
      />
      <TextField
        label="Descrição"
        error={errors?.description}
        placeholder="Ex.: Questões de portugues ENEM"
        onChangeText={(text) => setValue('description', text)}
        defaultValue={getValues('description')}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        title={subject ? 'Salvar Matéria' : 'Criar Matéria'}
        color="#1969d3"
      />
    </>
  );
}
