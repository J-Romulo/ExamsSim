import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { FinishExamModal } from './FinishExamModal';
import * as S from './styles';
import { getExamResults } from './utils/getExamResults';
import { CountdownTimer } from '../../../components/CountdownTimer';
import { LoadingModal } from '../../../components/LoadingModal';
import { Container, Label } from '../../../global/styles/globalComponents';
import { useCountdown } from '../../../hooks/useCountdown';
import { useStorage } from '../../../hooks/useStorage';

export function SimulateExam({ route }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const { id } = route.params;
  const { fetchExam, fetchSubjectByTitle, saveExamResult } = useStorage();
  const [exam, setExam] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentQuestionindex, setCurrentQuestionIndex] = useState(0);
  const [finishedExam, setFinishedExam] = useState(false);
  const [isResultModalVisible, setResultModalVisible] = useState(false);

  const [currentTime, setCurrentTime] = useState({
    hour: -1,
    minute: -1,
    second: -1,
    question_id: '',
  });

  const { goBack } = useNavigation();

  async function fetchExamItem() {
    setLoading(true);
    const exam = await fetchExam(id);

    const questions = await Promise.all(
      exam.subjects.map(async (subject) => {
        return await fetchQuestions(subject);
      })
    );

    setExam(exam);
    setQuestions(questions.flat());
    setCurrentQuestion(questions.flat()[0]);
    setLoading(false);
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

  useEffect(() => {
    const examType = exam?.examType;
    const question_id = examType === 'overall_time' ? '' : currentQuestion?.id;

    if (
      examType === 'question_time' &&
      (currentQuestion?.hour ||
        currentQuestion?.minute ||
        currentQuestion?.second ||
        currentQuestion?.no_time)
    ) {
      setCurrentTime({
        hour: Number(currentQuestion.hour),
        minute: Number(currentQuestion.minute),
        second: Number(currentQuestion.second),
        question_id,
      });
    } else {
      setCurrentTime({
        hour: Number(exam?.hour),
        minute: Number(exam?.minute),
        second: 0,
        question_id,
      });
    }
  }, [currentQuestion, exam]);

  const [, hours, minutes, seconds] = useCountdown({
    hours: currentTime.hour,
    minutes: currentTime.minute,
    seconds: currentTime.second,
    question_id: currentTime.question_id,
  });

  useEffect(() => {
    if (!hours && !minutes && !seconds && !finishedExam) {
      if (exam?.examType === 'overall_time') {
        finishExam();
      } else if (exam?.examType === 'question_time' && !currentQuestion?.no_time) {
        saveCurrentQuestionWithNoTime();
        Alert.alert('Sem tempo!', 'O tempo para responder essa questão acabou.');
      }
    }
  }, [hours, minutes, seconds]);

  function nextQuestion() {
    if (!questions[currentQuestionindex + 1]) return;

    saveCurrentQuestionWithCurrentTime();

    setCurrentQuestion(questions[currentQuestionindex + 1]);
    setCurrentQuestionIndex(currentQuestionindex + 1);
  }

  function lastQuestion() {
    if (!questions[currentQuestionindex - 1]) return;

    saveCurrentQuestionWithCurrentTime();

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

  function saveCurrentQuestionWithCurrentTime() {
    const newQuestionsArray = [...questions];
    newQuestionsArray[currentQuestionindex] = {
      ...newQuestionsArray[currentQuestionindex],
      hour: hours ?? 0,
      minute: minutes ?? 0,
      second: seconds ?? 0,
    };
    setQuestions(newQuestionsArray);
  }

  function saveCurrentQuestionWithNoTime() {
    const newQuestionsArray = [...questions];
    newQuestionsArray[currentQuestionindex] = {
      ...newQuestionsArray[currentQuestionindex],
      no_time: true,
    };
    setQuestions(newQuestionsArray);
    setCurrentQuestion(newQuestionsArray[currentQuestionindex]);
  }

  function RenderQuestion(item) {
    const timeEnded = currentQuestion.no_time ?? false;
    let correctAnswer = false;
    const selectedAnswer = currentQuestion.selectedAnswer === item.index;

    if (finishedExam) {
      correctAnswer = Number(currentQuestion.correct_answer) === Number(item.index);
    }

    return (
      <S.ItemContainer
        onPress={(e) => {
          e.preventDefault();
          selectAnswer(item);
        }}
        selected={selectedAnswer}
        correct={correctAnswer}
        disabled={finishedExam || timeEnded}
        finishedExam={finishedExam}>
        <S.ItemTitle>{item.item}</S.ItemTitle>
      </S.ItemContainer>
    );
  }

  function finishExam() {
    setFinishedExam(true);
    setResultModalVisible(true);
    saveCurrentQuestionWithCurrentTime();

    const examResults = getExamResults(questions);
    saveExamResult(exam, examResults);
  }

  function exitExam() {
    goBack();
  }

  if (!currentQuestion || !exam) {
    return (
      <Container>
        <LoadingModal isVisible={loading} />
      </Container>
    );
  }

  const handleSwipe = ({ nativeEvent }) => {
    const { state } = nativeEvent;
    if (state === 5) {
      //handle swipe right
      if (nativeEvent.translationX < -150) {
        nextQuestion();
      }
      //handle swipe left
      else if (nativeEvent.translationX > 150) {
        lastQuestion();
      }
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handleSwipe}>
      <Container>
        <FinishExamModal
          questions={questions}
          isModalVisible={isResultModalVisible}
          setModalVisible={setResultModalVisible}
        />

        <S.ExamHeader>
          <S.ArrowButton onPress={lastQuestion}>
            <AntDesign name="arrowleft" size={32} color={theme.colors.text_on_background} />
          </S.ArrowButton>

          <S.QuestionsCount>{`${currentQuestionindex + 1}/${questions.length}`}</S.QuestionsCount>

          {!!(hours > 0 || minutes > 0 || seconds > 0) && !finishedExam && (
            <CountdownTimer hours={hours} minutes={minutes} seconds={seconds} />
          )}

          <S.ArrowButton onPress={nextQuestion}>
            <AntDesign name="arrowright" size={32} color={theme.colors.text_on_background} />
          </S.ArrowButton>
        </S.ExamHeader>

        <LoadingModal isVisible={loading} />
        <Label>Questão</Label>
        <S.FieldValue>{currentQuestion.question}</S.FieldValue>

        <S.QuestionsHeader>
          <Label>Alternativas</Label>
        </S.QuestionsHeader>

        <FlatList
          data={currentQuestion?.answers}
          renderItem={RenderQuestion}
          keyExtractor={(item) => item}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
        />

        {finishedExam ? (
          <S.ButtonsContainer>
            <S.FinishButton
              onPress={() => setResultModalVisible(true)}
              style={{ backgroundColor: theme.colors.primary }}>
              <S.ButtonText>Ver resultados</S.ButtonText>
            </S.FinishButton>

            <S.FinishButton onPress={exitExam}>
              <S.ButtonText>Sair</S.ButtonText>
            </S.FinishButton>
          </S.ButtonsContainer>
        ) : (
          <S.FinishButton onPress={finishExam}>
            <S.ButtonText>Finalizar teste</S.ButtonText>
          </S.FinishButton>
        )}
      </Container>
    </PanGestureHandler>
  );
}
