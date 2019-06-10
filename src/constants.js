export default {
    serverUrl: '',
    token: '12345678',
    notSelected: "there's nothing to do. You must answer that question",
    result: "Excellent, congratulations, you're a monster",
    possibleAnswers: {
        2: {
            1: {
                title: 'Are you afraid of the dark?',
                questions: [
                    `I'm not scared at all`,
                    'Sometimes',
                    'Never',
                    'What a stupid question!'],
                img: '/img/page_3_monster.png',
                inputType : 'RadioButton'
            },
            2: {
                title: 'What do you prefer?',
                questions: [
                    'Fuf',
                    'Snake skin',
                    'Slick skin',
                    'Velvet'
                ],
                img: '/img/page_4_monster.png',
                inputType : 'CheckboxInput'
            }
        },
        3: {
            1: {
                title: 'Are you a monster day or a night monster',
                questions: [
                    'Night monster',
                    'Day monster'

                ],
                img: '/img/page_7_monster.png',
                inputType : 'SwitchInput'
            }
        },
        4: {
            1: {
                title: "You'd rather be a bad or&#10;a good monster",
                questions: [
                    'Bad monster',
                    'Good monster'

                ],
                img: '/img/page_8_monster.png',
                inputType : 'SliderInput'
            }
        }
    }
};
