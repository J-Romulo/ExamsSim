import { useNavigation, StackActions } from '@react-navigation/native';
import { useState } from 'react';
import { uid } from 'uid';

import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';
import { ExamForm } from '../Components/ExamForm';

export function CreateExam() {
  const [loading, setLoading] = useState(false);

  const { addExam } = useStorage();
  const { dispatch } = useNavigation();

  async function onSubmit(data) {
    const exam = {
      id: uid(),
      ...data,
    };

    setLoading(true);
    await addExam(exam);
    setLoading(false);

    dispatch(StackActions.replace('simulate_exam', { id: exam.id }));
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <ExamForm sendData={onSubmit} />
    </Container>
  );
}
