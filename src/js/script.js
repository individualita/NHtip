const options = document.getElementById('options');
const questions = document.getElementById('questions');
const back = document.getElementById('back');
const polandButton = document.getElementById('poland');
const ukraineButton = document.getElementById('ukraine');

const questionsData = {
    POLAND: [
        {
            question: "Kosztuje powyżej 350 złotych?",
            options: ["Powyżej", "Poniżej"]
        },
        {
            question: "Вопрос 2 (POLAND)",
            options: ["Ответ 1", "Ответ 2"]
        },
        {
            question: "Вопрос 3 (POLAND)",
            options: ["Ответ 1", "Ответ 2"]
        }
    ],
    UKRAINE: [
        {
            question: "Сможет ли доставить устройство в течении 2 рабочих дней?",
            options: ["Нет", "Да"]
        },
        {
            question: "Вопрос 2 (UKRAINE)",
            options: ["Ответ 1", "Ответ 2"]
        },
        {
            question: "Вопрос 3 (UKRAINE)",
            options: ["Ответ 1", "Ответ 2"]
        }
    ]
};

let currentQuestionIndex = -1;
let selectedCountry = "";

polandButton.addEventListener('click', () => {
    selectedCountry = "POLAND";
    showNextQuestion();
});

ukraineButton.addEventListener('click', () => {
    selectedCountry = "UKRAINE";
    showNextQuestion();
});

function showNextQuestion() {
    options.style.display = 'none';
    back.style.display = 'inline';
    questions.style.display = 'block';
    currentQuestionIndex = 0;
    displayCurrentQuestion();
}
/**function displayCurrentQuestion() {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsData[selectedCountry].length) {
        const currentQuestion = questionsData[selectedCountry][currentQuestionIndex];
        questions.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            <button id="option1">${currentQuestion.options[0]}</button>
            <button id="option2">${currentQuestion.options[1]}</button>
        `;

        const option1Button = document.getElementById('option1');
        const option2Button = document.getElementById('option2');

        option1Button.addEventListener('click', () => {
            if (currentQuestion.options[0] === "Дороже") {
                // Показать текст "клиенту необходимо самостоятельно отправить устройство в АСЦ"
                // и кнопку "конец"
                questions.innerHTML = `
                    <h2>Клиенту необходимо самостоятельно отправить устройство в АСЦ</h2>
                    <button id="end">Конец</button>
                `;

                const endButton = document.getElementById('end');
                endButton.addEventListener('click', () => {
                    // Вернуться к началу
                    resetToInitialState();
                });
            }
            else if (currentQuestion.options[0] === "Ответ 1") {
                // Обработка выбора "Ответ 1"
                // Перейти к следующему вопросу
                currentQuestionIndex++;
                displayCurrentQuestion();
            }
        });

        option2Button.addEventListener('click', () => {
            if (currentQuestion.options[1] === "Дешевле") {
                // Показать текст "не ремонтируем устройства до 350 злотых, клиенту нужно обратиться в магазин"
                // и кнопку "конец"
                questions.innerHTML = `
                    <h2>Не ремонтируем устройства до 350 злотых, клиенту нужно обратиться в магазин</h2>
                    <button id="end">Конец</button>
                `;

                const endButton = document.getElementById('end');
                endButton.addEventListener('click', () => {
                    // Вернуться к началу
                    resetToInitialState();
                });
            }
            else if (currentQuestion.options[1] === "Ответ 2") {
                // Обработка выбора "Ответ 2"
                // Перейти к следующему вопросу
                currentQuestionIndex++;
                displayCurrentQuestion();
            }
        });
    } else {
        // Все вопросы завершены
        questions.innerHTML = `<h2>Вопросы завершены для ${selectedCountry}</h2>`;
    }
}
**/

function displayCurrentQuestion() {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsData[selectedCountry].length) {
        const currentQuestion = questionsData[selectedCountry][currentQuestionIndex];
        questions.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            <button class="answer-button">${currentQuestion.options[0]}</button>
            <button class="answer-button">${currentQuestion.options[1]}</button>
        `;

        const answerButtons = document.querySelectorAll('.answer-button');

        answerButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                handleAnswer(currentQuestion.options[index]);
            });
        });
    } else {
        // Все вопросы завершены
        questions.innerHTML = `<h2>Вопросы завершены для ${selectedCountry}</h2>`;
    }
}

function handleAnswer(answer) {
    if (answer === "Да") {
        // Показать текст "Заявку регистрируем"
        // и кнопку "конец"
        questions.innerHTML = `
            <h2>Заявку регистрируем</h2>
            <button id="end">Конец</button>
        `;

        const endButton = document.getElementById('end');
        endButton.addEventListener('click', () => {
            // Вернуться к началу
            resetToInitialState();
        });
    } else if (answer === "Нет") {
        // Показать текст "Заявку не регистрируем, пускай клиент перезвонит"
        // и кнопку "конец"
        questions.innerHTML = `
            <h2>Заявку не регистрируем, пускай клиент перезвонит</h2>
            <button id="end">Конец</button>
        `;

        const endButton = document.getElementById('end');
        endButton.addEventListener('click', () => {
            // Вернуться к началу
            resetToInitialState();
        });
    } else if (currentQuestionIndex === 0 && (answer === "Powyżej" || answer === "Poniżej")) {
        // Показать текст "устройство необходимо доставить в АСЦ" или "обратиться в магазин"
        // и кнопку "конец"
        let message;
        if (answer === "Powyżej") {
            message = "Klient dostarcza urządzenie samodzielnie. BEZ ZGŁOSZENIA";
        } else if (answer === "Poniżej") {
            message = "Nie naprawiamy urządzenia. Trzeba udać się do sklepu";
        }
        
        questions.innerHTML = `
            <h2>${message}</h2>
            <button id="end">Конец</button>
        `;

        const endButton = document.getElementById('end');
        endButton.addEventListener('click', () => {
            // Вернуться к началу
            resetToInitialState();
        });
    }
}









function resetToInitialState() {
    options.style.display = 'block';
    back.style.display = 'none';
    questions.style.display = 'none';
    questions.innerHTML = '';
    currentQuestionIndex = -1;
    selectedCountry = "";
}



function resetToInitialState() {
    options.style.display = 'block';
    back.style.display = 'none';
    questions.style.display = 'none';
    questions.innerHTML = '';
    currentQuestionIndex = -1;
    selectedCountry = "";
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    } else {
        // Вернуться к выбору страны
        options.style.display = 'block';
        back.style.display = 'none';
        questions.style.display = 'none';
        questions.innerHTML = '';
    }
}

