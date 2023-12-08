import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, LayoutAnimation, UIManager } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { EmptyContent } from '../../../components/EmptyContent';
import { LoadingModal } from '../../../components/LoadingModal';
import {
  Container,
  FloatingActionButton,
  ItemContainer,
} from '../../../global/styles/globalComponents';
import { useDialogModal } from '../../../hooks/useDialogModal';
import { useStorage } from '../../../hooks/useStorage';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export function ExamDetails({ route }) {
  const { id } = route.params;

  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const { openTwoOptionsModal } = useDialogModal();
  const { fetchExamWithSubjects, dissociateSubjectFromExam } = useStorage();
  const [exam, setExam] = useState();
  const isFocused = useIsFocused();

  const [subjectsListOpen, setSubjectListOpen] = useState(true);
  const [questionsListOpen, setQuestionsListOpen] = useState(false);
  const [historyListOpen, setHistoryListOpen] = useState(false);

  const { navigate } = useNavigation();

  async function fetchExamItem() {
    setLoading(true);
    const exam = await fetchExamWithSubjects(id);

    setExam(exam);
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchExamItem();
    }
  }, [isFocused, id]);

  function handleDesassociateSubject(subject_title) {
    openTwoOptionsModal(
      'Tem certeza que deseja desassociar a matéria?',
      'Sim',
      'Cancelar',
      async () => {
        await dissociateSubjectFromExam(id, subject_title);
        fetchExamItem();
      }
    );
  }

  function handleSubjectsMenu() {
    // Define the animation configuration
    const config = LayoutAnimation.create(
      200, // duration in milliseconds
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.scaleY // specify the property to animate
    );

    // Trigger the layout animation
    LayoutAnimation.configureNext(config);

    setSubjectListOpen(!subjectsListOpen);
  }

  function handleHistoricMenu() {
    // Define the animation configuration
    const config = LayoutAnimation.create(
      200, // duration in milliseconds
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.scaleY // specify the property to animate
    );

    // Trigger the layout animation
    LayoutAnimation.configureNext(config);

    setHistoryListOpen(!historyListOpen);
  }

  function RenderSubjects(item) {
    return (
      <>
        <ItemContainer
          onPress={() => {
            navigate('subject_details', { id: item.item.id });
          }}>
          <S.ItemTitle>{item.item.title}</S.ItemTitle>
        </ItemContainer>

        <S.DeleteButton onPress={() => handleDesassociateSubject(item.item.title)}>
          <AntDesign name="minus" size={12} color="white" />
        </S.DeleteButton>
      </>
    );
  }

  function RenderHistoric(item) {
    return (
      <>
        <ItemContainer>
          <S.ItemTitle>{item.item.correct_answers}</S.ItemTitle>
        </ItemContainer>
      </>
    );
  }

  return (
    <Container>
      <ScrollView>
        <LoadingModal isVisible={loading} />

        <S.ExamTitle>{exam?.title}</S.ExamTitle>
        <S.ExamDescription>{exam?.description}</S.ExamDescription>

        <S.SubjectListContainer>
          <S.SubjectListBttn onPress={handleSubjectsMenu}>
            <S.SubjectListTitle>Matérias associadas</S.SubjectListTitle>
            <AntDesign
              name={subjectsListOpen ? 'caretup' : 'caretdown'}
              size={25}
              color={theme.colors.primary_text}
            />
          </S.SubjectListBttn>

          {subjectsListOpen && (
            <FlatList
              data={exam?.subjects}
              renderItem={RenderSubjects}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={EmptyContent({ emptyText: 'Nenhuma matéria encontrada' })}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
            />
          )}
        </S.SubjectListContainer>

        <S.SubjectListContainer>
          <S.SubjectListBttn onPress={handleHistoricMenu}>
            <S.SubjectListTitle>Histórico</S.SubjectListTitle>
            <AntDesign
              name={historyListOpen ? 'caretup' : 'caretdown'}
              size={25}
              color={theme.colors.primary_text}
            />
          </S.SubjectListBttn>

          {historyListOpen && (
            <FlatList
              data={exam?.results}
              renderItem={RenderHistoric}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={EmptyContent({ emptyText: 'Nenhum histórico encontrado' })}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
            />
          )}
        </S.SubjectListContainer>
      </ScrollView>
      <FloatingActionButton
        onPress={() => {
          navigate('simulate_exam', { id: exam.id });
        }}>
        <AntDesign name="playcircleo" size={24} color={theme.colors.text_on_background} />
      </FloatingActionButton>
    </Container>
  );
}
