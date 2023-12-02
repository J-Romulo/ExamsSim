import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { uid } from 'uid';

import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';
import { QuestionForm } from '../Components/QuestionForm';

export function CreateQuestion({ route }) {
  const [loading, setLoading] = useState(false);

  const params = route.params;
  const { addQuestion } = useStorage();

  const { goBack, navigate } = useNavigation();

  async function onSubmit(data) {
    const question = {
      id: uid(),
      ...data,
      subjects: params?.id_subject ? [params?.id_subject] : [],
    };

    setLoading(true);
    await addQuestion(question);
    setLoading(false);

    if (params?.id_subject) {
      navigate('subject_details', { id: params?.id_subject });
    } else {
      goBack();
    }
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <QuestionForm sendData={onSubmit} />
    </Container>
  );
}
