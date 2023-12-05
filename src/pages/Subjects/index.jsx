import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useEffect, useReducer, useState } from 'react';
import { FlatList, BackHandler } from 'react-native';
import { useTheme } from 'styled-components/native';

import { SubjectsReducer, SubjectsReducerActions } from './reducer';
import * as S from './styles';
import { EmptyContent } from '../../components/EmptyContent';
import { LoadingModal } from '../../components/LoadingModal';
import {
  Container,
  ItemContainer,
  SelectedItemOverlay,
} from '../../global/styles/globalComponents';
import { useStorage } from '../../hooks/useStorage';

export function Subjects(props) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const { fetchSubjects, deleteSubjects } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [state, dispatch] = useReducer(SubjectsReducer, {
    subjects: [],
    filteredSubjects: [],
    selectedSubjects: [],
    selectingSubjects: false,
  });

  const { subjects, filteredSubjects, selectedSubjects, selectingSubjects } = state;

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectingSubjects) {
        dispatch({ type: SubjectsReducerActions.RESET_SELECTION });
        return true;
      }
    });

    return () => backHandler.remove();
  }, [selectingSubjects]);

  async function fetchSubjectItems() {
    setLoading(true);

    const fetched_subjects = await fetchSubjects();
    dispatch({ type: SubjectsReducerActions.SET_SUBJECTS, payload: fetched_subjects });

    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  useEffect(() => {
    if (subjects) {
      const filter = subjects.filter((subjectItem) => {
        return subjectItem.title.toUpperCase().includes(props.searchText.toUpperCase());
      });

      dispatch({ type: SubjectsReducerActions.SET_FILTERED, payload: filter });
    }
  }, [props.searchText, subjects]);

  function onRefresh() {
    setRefreshing(true);
    fetchSubjectItems();
    setRefreshing(false);
  }

  function handleLongPress(item) {
    if (!selectingSubjects) dispatch({ type: SubjectsReducerActions.TOGGLE_SELECTING });

    if (selectedSubjects.includes(item.id)) {
      const newSubjectsSelected = selectedSubjects.filter((listItem) => listItem !== item.id);

      if (newSubjectsSelected.length === 0)
        dispatch({ type: SubjectsReducerActions.TOGGLE_SELECTING });

      return dispatch({
        type: SubjectsReducerActions.SET_SELECTED,
        payload: [...newSubjectsSelected],
      });
    }

    dispatch({
      type: SubjectsReducerActions.SET_SELECTED,
      payload: [...selectedSubjects, item.id],
    });
  }

  async function handleDeleteSelectedItems() {
    await deleteSubjects(selectedSubjects);
    dispatch({ type: SubjectsReducerActions.RESET_SELECTION });
    onRefresh();
  }

  function getSelected(item) {
    return selectedSubjects.includes(item.id);
  }

  function RenderSubject(item) {
    const isSubjectSelected = getSelected(item.item);

    return (
      <ItemContainer
        onPress={() => {
          if (selectingSubjects) handleLongPress(item.item);
          else navigate('subject_details', { id: item.item.id });
        }}
        onLongPress={() => handleLongPress(item.item)}>
        <S.ItemTitle>{item.item.title}</S.ItemTitle>
        {isSubjectSelected && <SelectedItemOverlay />}
      </ItemContainer>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={!filteredSubjects.length && loading} />
      <FlatList
        data={filteredSubjects}
        renderItem={RenderSubject}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyContent({ emptyText: 'Nenhuma matéria encontrada' })}
        onRefresh={onRefresh}
        refreshing={refreshing}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
      />

      {selectingSubjects ? (
        <S.CreateButton onPress={handleDeleteSelectedItems}>
          <Ionicons name="trash-bin" size={24} color={theme.colors.text_on_background} />
        </S.CreateButton>
      ) : (
        <S.CreateButton
          onPress={() => {
            navigate('create_subject');
          }}>
          <AntDesign name="plus" size={24} color={theme.colors.text_on_background} />
        </S.CreateButton>
      )}
    </Container>
  );
}
