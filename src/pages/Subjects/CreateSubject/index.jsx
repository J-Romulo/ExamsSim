import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { uid } from 'uid';

import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';
import { SubjectForm } from '../Components/SubjectForm';

export function CreateSubject() {
  const [loading, setLoading] = useState(false);

  const { addSubject } = useStorage();
  const { navigate } = useNavigation();

  async function createSubject(data) {
    const subject = {
      id: uid(),
      ...data,
      questions: [],
    };

    setLoading(true);
    await addSubject(subject);
    setLoading(false);

    navigate('subjects');
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <SubjectForm sendData={createSubject} />
    </Container>
  );
}
