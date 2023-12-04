import { useState } from 'react';
import { Switch } from 'react-native-paper';

import * as S from './styles';
import { LoadingModal } from '../../components/LoadingModal';
import { Container } from '../../global/styles/globalComponents';
import { useColorMode } from '../../hooks/useColorMode';

export function Settings() {
  const { toggleTheme, theme } = useColorMode();

  const [isSwitchOn, setIsSwitchOn] = useState(theme === 'dark');
  const [loading, setLoading] = useState(false);

  async function onToggleSwitch() {
    setLoading(true);
    setIsSwitchOn(!isSwitchOn);
    await toggleTheme();
    setLoading(false);
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <S.MenuItem>
        <S.MenuText>Modo noturno</S.MenuText>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </S.MenuItem>
    </Container>
  );
}
