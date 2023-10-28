import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { FinishExamModal } from './FinishExamModal';
import * as S from './styles';
import { CountdownTimer } from '../../../components/CountdownTimer';
import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useCountdown } from '../../../hooks/useCountdown';
import { useStorage } from '../../../hooks/useStorage';

export function SimulateExam({ route }) {
  const { id } = route.params;
  const { fetchExam, fetchSubjectByTitle, loading } = useStorage();
  const [exam, setExam] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentQuestionindex, setCurrentQuestionIndex] = useState(0);
  const [finishedExam, setFinishedExam] = useState(false);

  async function fetchExamItem() {
    const exam = await fetchExam(id);

    const questions = await Promise.all(
      exam.subjects.map(async (subject) => {
        return await fetchQuestions(subject);
      })
    );

    setExam(exam);
    setQuestions(questions.flat());
    setCurrentQuestion(questions.flat()[0]);
  }

  async function fetchQuestions(subject_id) {
    const subject = await fetchSubjectByTitle(subject_id);

    return subject.questions;
  }

  useEffect(() => {
    if (id) {
      fetchExamItem();
    }
  }, [id]);

  const [, hours, minutes, seconds] = useCountdown({ hours: exam?.hour, minutes: exam?.minute });

  function nextQuestion() {
    if (!questions[currentQuestionindex + 1]) return;
    setCurrentQuestion(questions[currentQuestionindex + 1]);
    setCurrentQuestionIndex(currentQuestionindex + 1);
  }

  function lastQuestion() {
    if (!questions[currentQuestionindex - 1]) return;
    setCurrentQuestion(questions[currentQuestionindex - 1]);
    setCurrentQuestionIndex(currentQuestionindex - 1);
  }

  function selectAnswer(item) {
    setQuestions((prevData) =>
      prevData.map((question, index) =>
        index === currentQuestionindex ? { ...question, selectedAnswer: item.index } : question
      )
    );

    setCurrentQuestion((prevData) => {
      return { ...prevData, selectedAnswer: item.index };
    });
  }

  function RenderQuestion(item) {
    const selectedAnswer = currentQuestion.selectedAnswer === item.index;

    return (
      <S.ItemContainer
        onPress={(e) => {
          e.preventDefault();
          selectAnswer(item);
        }}
        selected={selectedAnswer}>
        <S.ItemTitle>{item.item}</S.ItemTitle>
      </S.ItemContainer>
    );
  }

  function finishExam() {
    setFinishedExam(true);
  }

  if (!currentQuestion || !exam) {
    return (
      <Container>
        <LoadingModal isVisible={loading} />
      </Container>
    );
  }
  return (
    <Container>
      {!!finishedExam && <FinishExamModal />}

      <S.ExamHeader>
        <S.ArrowButton onPress={lastQuestion}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </S.ArrowButton>

        <S.QuestionsCount>{`${currentQuestionindex + 1}/${questions.length}`}</S.QuestionsCount>

        {!!(hours && minutes && seconds) && (
          <CountdownTimer hours={hours} minutes={minutes} seconds={seconds} />
        )}

        <S.ArrowButton onPress={nextQuestion}>
          <AntDesign name="arrowright" size={24} color="black" />
        </S.ArrowButton>
      </S.ExamHeader>

      <LoadingModal isVisible={loading} />
      <S.FieldLabel>Questão</S.FieldLabel>
      <S.FieldValue>{currentQuestion.question}</S.FieldValue>

      <S.QuestionsHeader>
        <S.FieldLabel>Alternativas</S.FieldLabel>
      </S.QuestionsHeader>

      <FlatList
        data={currentQuestion?.answers}
        renderItem={RenderQuestion}
        keyExtractor={(item) => item}
      />

      <S.FinishButton onPress={finishExam}>
        <S.ButtonText>Finalizar teste</S.ButtonText>
      </S.FinishButton>
    </Container>
  );
}
