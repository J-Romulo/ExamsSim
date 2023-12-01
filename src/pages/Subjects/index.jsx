import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { EmptyContent } from '../../components/EmptyContent';
import { LoadingModal } from '../../components/LoadingModal';
import { Container, ItemContainer } from '../../global/styles/globalComponents';
import { useStorage } from '../../hooks/useStorage';

export function Subjects(props) {
  const { fetchSubjects, loading } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  async function fetchSubjectItems() {
    const subjects = await fetchSubjects();

    setSubjects(subjects);
    setFilteredSubjects(subjects);
  }

  useEffect(() => {
    if (isFocused) {
      fetchSubjectItems();
    }
  }, [isFocused]);

  useEffect(() => {
    if (subjects) {
      const filter = subjects.filter((subjectItem) => {
        return subjectItem.title.toUpperCase().includes(props.searchText.toUpperCase());
      });

      setFilteredSubjects(filter);
    }
  }, [props.searchText, subjects]);

  function onRefresh() {
    setRefreshing(true);
    fetchSubjectItems();
    setRefreshing(false);
  }

  function RenderSubject(item) {
    return (
      <ItemContainer
        onPress={() => {
          navigate('subject_details', { id: item.item.id });
        }}>
        <S.ItemTitle>{item.item.title}</S.ItemTitle>
      </ItemContainer>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={subjects.length === 0 && loading} />
      <FlatList
        data={filteredSubjects}
        renderItem={RenderSubject}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyContent({ emptyText: 'Nenhuma matéria encontrada' })}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <S.CreateButton
        onPress={() => {
          navigate('create_subject');
        }}>
        <AntDesign name="plus" size={24} color="black" />
      </S.CreateButton>
    </Container>
  );
}
