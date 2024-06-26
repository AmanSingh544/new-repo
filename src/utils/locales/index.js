import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import fr from "./fr";
import { store } from "src/redux/store";
import { projLanguages} from 'src/constants/appConstants';

const resources = {
    en: { translation: en },
    fr: { translation: fr }
}

const i18nInitialise = () => {
    const lng = store.getState().languageReducer.language;
    return (
        i18n
            .use(initReactI18next)
            .init({
                resources,
                lng,
                fallbackLng: projLanguages.ENGLISH,
                interpolation: {
                    escapeValue: false
                }
            })
    )
}

export default i18nInitialise;