import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, LayoutAnimation, UIManager } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { EmptyContent } from '../../../components/EmptyContent';
import { LoadingModal } from '../../../components/LoadingModal';
import { Container, ItemContainer } from '../../../global/styles/globalComponents';
import { useDialogModal } from '../../../hooks/useDialogModal';
import { useStorage } from '../../../hooks/useStorage';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export function QuestionDetails({ route }) {
  const { openTwoOptionsModal } = useDialogModal();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const { id } = route.params;
  const { fetchQuestionWithSubjects, dissociateQuestionFromSubject } = useStorage();
  const [question, setQuestion] = useState();
  const isFocused = useIsFocused();
  const [subjectsListOpen, setSubjectListOpen] = useState(false);
  const { navigate } = useNavigation();

  async function fetchQuestionItem() {
    setLoading(true);
    const question = await fetchQuestionWithSubjects(id);

    setQuestion(question);
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchQuestionItem();
    }
  }, [isFocused, id]);

  function handleDesassociateSubject(subject_id) {
    openTwoOptionsModal(
      'Tem certeza que deseja desassociar a matéria?',
      'Sim',
      'Cancelar',
      async () => {
        await dissociateQuestionFromSubject(subject_id, id);
        fetchQuestionItem();
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

  function RenderQuestion(item) {
    const correctAnswer = Number(question.correct_answer) === Number(item.index);

    return (
      <S.ItemContainer correct={correctAnswer}>
        <S.ItemTitle>{item.item}</S.ItemTitle>
      </S.ItemContainer>
    );
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

        <S.DeleteButton onPress={() => handleDesassociateSubject(item.item.id)}>
          <AntDesign name="minus" size={12} color="white" />
        </S.DeleteButton>
      </>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />

      <S.QuestionValue>{question?.question}</S.QuestionValue>

      <FlatList
        data={question?.answers}
        renderItem={RenderQuestion}
        keyExtractor={(item) => item}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
      />

      <S.SubjectListContainer>
        <S.SubjectListBttn onPress={handleSubjectsMenu}>
          <S.SubjectListTitle>Matérias associadas</S.SubjectListTitle>
          <AntDesign
            name={subjectsListOpen ? 'caretdown' : 'caretup'}
            size={25}
            color={theme.colors.primary_text}
          />
        </S.SubjectListBttn>

        {subjectsListOpen && (
          <ScrollView>
            <FlatList
              data={question?.subjects}
              renderItem={RenderSubjects}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={EmptyContent({ emptyText: 'Nenhuma matéria encontrada' })}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
            />
          </ScrollView>
        )}
      </S.SubjectListContainer>
    </Container>
  );
}
