import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';

export function ExamDetails({ route }) {
  const { id } = route.params;

  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const { fetchExam } = useStorage();
  const [exam, setExam] = useState();
  const isFocused = useIsFocused();

  const [subjectsListOpen, setSubjectListOpen] = useState(false);
  const [questionsListOpen, setQuestionsListOpen] = useState(false);
  const [historyListOpen, setHistoryListOpen] = useState(false);

  const { navigate } = useNavigation();

  async function fetchExamItem() {
    setLoading(true);
    const exam = await fetchExam(id);

    setExam(exam);
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchExamItem();
    }
  }, [isFocused, id]);

  return (
    <Container>
      <LoadingModal isVisible={loading} />

      <S.ExamTitle>{exam?.title}</S.ExamTitle>
      <S.ExamDescription>{exam?.description}</S.ExamDescription>
    </Container>
  );
}
