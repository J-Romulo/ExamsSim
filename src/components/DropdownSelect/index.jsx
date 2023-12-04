import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from 'styled-components';

DropDownPicker.modifyTranslation('PT', {
  PLACEHOLDER: 'Selecione um item',
  SEARCH_PLACEHOLDER: 'Procurar...',
  SELECTED_ITEMS_COUNT_TEXT: '{count} itens selecionados', // See below for advanced options
  NOTHING_TO_SHOW: 'Nenhum ícone encontrado.',
});

export function DropdownSelect({ values, value, setValue, setItems, error, ...selectProps }) {
  const theme = useTheme();

  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      <DropDownPicker
        open={openDropdown}
        value={value}
        items={values}
        setOpen={setOpenDropdown}
        setValue={setValue}
        setItems={setItems}
        language="PT"
        style={{
          backgroundColor: theme.colors.background_surface,
          borderColor: error ? theme.colors.red : 'black',
        }}
        dropDownContainerStyle={{
          backgroundColor: theme.colors.background_surface,
        }}
        {...selectProps}
      />
    </>
  );
}
