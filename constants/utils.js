import { Platform, StatusBar } from 'react-native';
import { theme } from 'galio-framework';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export const zoneList = [
    {
        label: "Ablekuma-Awoshie",
        value: "Ablekuma-Awoshie",
    },
    {
        label: "Tema-Spintext Zone",
        value: "Tema-Spintext Zone",
    },
    {
        label: "Afeanya-Prampram Zone",
        value: "Afeanya-Prampram Zone",
    },
    {
        label: "Ofankor-Nsawam Zone",
        value: "Ofankor-Nsawam Zone",
    },

    {
        label: "Odorkor-Accra Zone",
        value: "Odorkor-Accra Zone",
    },
    {
        label: "Madina-Adenta-Aburi Zone",
        value: "Madina-Adenta-Aburi Zone",
    },
    {
        label: "Kwashieman-Lapaz-Legon Zone",
        value: "Kwashieman-Lapaz-Legon Zone",
    },
    {
        label: "Kasoa-Mallam-ofankor Zone",
        value: "Kasoa-Mallam-ofankor Zone",
    },

    {
        label: "La-Teshie-Nungua Zone",
        value: "La-Teshie-Nungua Zone",
    },
    {
        label: "East Legon - Airport - 37 Zone",
        value: "East Legon - Airport - 37 Zone",
    }
]
