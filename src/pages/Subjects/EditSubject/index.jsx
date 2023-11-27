import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';
import { SubjectForm } from '../Components/SubjectForm';

export function EditSubject({ route }) {
  const { id } = route.params;
  const [subject, setSubject] = useState();
  const { saveSubject, fetchSubject, loading } = useStorage();

  const isFocused = useIsFocused();
  const { navigate } = useNavigation();

  async function fetchSubjectItem() {
    const subject = await fetchSubject(id);

    setSubject(subject);
  }

  useEffect(() => {
    if (id) {
      fetchSubjectItem();
    }
  }, [isFocused, id]);

  async function saveEditedSubject(data) {
    const edited_subject = {
      ...subject,
      ...data,
    };

    await saveSubject(edited_subject);

    navigate('subject_details', { id: edited_subject.id });
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      {!!subject && <SubjectForm sendData={saveEditedSubject} subject={subject} />}
    </Container>
  );
}
