import { useState } from 'react';
import { Switch } from 'react-native-paper';

import * as S from './styles';
import { Container } from '../../global/styles/globalComponents';
import { useColorMode } from '../../hooks/useColorMode';

export function Settings() {
  const { toggleTheme } = useColorMode();

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  async function onToggleSwitch() {
    toggleTheme();
    setIsSwitchOn(!isSwitchOn);
  }

  return (
    <Container>
      <S.MenuItem>
        <S.MenuText>Modo noturno</S.MenuText>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </S.MenuItem>
    </Container>
  );
}
