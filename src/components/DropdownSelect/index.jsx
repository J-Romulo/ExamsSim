import { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.modifyTranslation("PT", {
    PLACEHOLDER: "Selecione um item",
    SEARCH_PLACEHOLDER: "Procurar...",
    SELECTED_ITEMS_COUNT_TEXT: '{count} itens selecionados', // See below for advanced options
    NOTHING_TO_SHOW: "Nenhum ícone encontrado."
});

export function DropdownSelect({ values, value, setValue, setItems, ...selectProps }){
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
                language={'PT'}
                {...selectProps}
            />
        </>
    )
}