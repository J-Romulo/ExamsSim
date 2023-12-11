import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';
import { ExamForm } from '../Components/ExamForm';

export function EditExam({ route }) {
  const [loading, setLoading] = useState(false);

  const { id } = route.params;
  const [exam, setExam] = useState();
  const { saveExam, fetchExam } = useStorage();

  const isFocused = useIsFocused();
  const { navigate } = useNavigation();

  async function fetchExamItem() {
    setLoading(true);
    const exam_fetched = await fetchExam(id);

    setExam(exam_fetched);
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchExamItem();
    }
  }, [isFocused, id]);

  async function saveEditedExam(data) {
    const edited_exam = {
      ...exam,
      ...data,
    };

    await saveExam(edited_exam);

    navigate('exam_details', { id: edited_exam.id });
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      {!!exam && <ExamForm sendData={saveEditedExam} exam={exam} />}
    </Container>
  );
}
