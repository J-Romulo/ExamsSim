import { useNavigation } from '@react-navigation/native';
import { uid } from 'uid';

import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';
import { SubjectForm } from '../Components/SubjectForm';

export function CreateSubject() {
  const { addSubject, loading } = useStorage();
  const { navigate } = useNavigation();

  async function createSubject(data) {
    const subject = {
      id: uid(),
      ...data,
      questions: [],
    };

    await addSubject(subject);

    navigate('Matérias');
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <SubjectForm sendData={createSubject} />
    </Container>
  );
}
