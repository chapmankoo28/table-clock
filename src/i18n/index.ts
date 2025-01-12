import { createI18n } from "vue-i18n";

export default createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'zh-HK',
    messages: {
        en: {
            settings: {
                settings: 'Settings',
                appearance: 'Appearance',
                light: 'Light',
                dark: 'Dark',
                layout: 'Layout',
                clock: 'Clock',
                cal: 'Calendar',
                lang: 'Language',
                en: 'English',
                'zh-HK': '繁體中文',
                fullscreen: 'Starts as Fullscreen',
                exitFullscreen: 'Exit Fullscreen',
                enterFullscreen: 'Enter Fullscreen',
                showSeconds: 'Show Seconds',
                sundayRed: 'Show Sunday in red',
            },
            weekdays: {
                '1': 'M',
                '2': 'T',
                '3': 'W',
                '4': 'T',
                '5': 'F',
                '6': 'S',
                '0': 'S',
            }
        },
        'zh-HK': {
            settings: {
                settings: '設定',
                appearance: '主題背景',
                light: '淺色',
                dark: '深色',
                layout: '版面佈局',
                clock: '時鐘',
                cal: '日曆',
                lang: '語言',
                en: 'English',
                'zh-HK': '繁體中文',
                fullscreen: '以全螢幕模式啟動',
                exitFullscreen: '退出全螢幕',
                enterFullscreen: '進入全螢幕',
                showSeconds: '顥示秒數',
                sundayRed: '星期日以紅色顯示',
            },
            weekdays: {
                '1': '一',
                '2': '二',
                '3': '三',
                '4': '四',
                '5': '五',
                '6': '六',
                '0': '日',
            }
        }
    }
})
