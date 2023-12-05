import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from 'styled-components';

import * as S from './styles';

export function SearchBar(props) {
  const theme = useTheme();
  const [barOpened, setBarOpened] = useState(false);

  function closeBar() {
    setBarOpened(false);
    props.setText('');
  }

  if (barOpened) {
    return (
      <S.Container>
        <S.TextField
          autoFocus
          placeholder={props.placeholder}
          onChangeText={(text) => {
            props.setText(text);
          }}
        />

        <S.CreateButton onPress={closeBar}>
          <FontAwesome name="close" size={24} color="white" />
        </S.CreateButton>
      </S.Container>
    );
  }

  return (
    <S.CreateButton onPress={() => setBarOpened(true)}>
      <FontAwesome name="search" size={24} color="white" />
    </S.CreateButton>
  );
}
