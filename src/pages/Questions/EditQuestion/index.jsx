import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';
import { QuestionForm } from '../Components/QuestionForm';

export function EditQuestion({ route }) {
  const [loading, setLoading] = useState(false);

  const { id } = route.params;
  const [question, setQuestion] = useState();
  const { saveQuestion, fetchQuestion } = useStorage();

  const isFocused = useIsFocused();
  const { navigate } = useNavigation();

  async function fetchQuestionItem() {
    setLoading(true);
    const question = await fetchQuestion(id);

    setQuestion(question);
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchQuestionItem();
    }
  }, [isFocused, id]);

  async function saveEditedQuestion(data) {
    const edited_question = {
      ...question,
      ...data,
    };

    await saveQuestion(edited_question);

    navigate('question_details', { id: edited_question.id });
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      {!!question && <QuestionForm sendData={saveEditedQuestion} question={question} />}
    </Container>
  );
}
