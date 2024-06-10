// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
    {
        question: 'Conhecendo seu namorado, qual o filme favorito dele?',
        answers: [
            {
                answer: 'Interstellar',
                correct: false,
            },
            {
                answer: 'Independence Day',
                correct: true,
            },
            {
                answer: 'Velozes e Furiosos 1',
                correct: false,
            },
            {
                answer: 'Se7en',
                correct: false,
            },
        ],
    },
    {
        question: 'O que eu mais odeio que você faça?',
        answers: [
            {
                answer: 'Ficar o dia sem comer',
                correct: true,
            },
            {
                answer: 'Mexer nas minhas espinhas.',
                correct: true,
            },
            {
                answer: 'Comer sushi quando sai',
                correct: false,
            },
            {
                answer: 'Sair sozinha, de noite e a pé.',
                correct: true,
            },
        ],
    },
    {
        question: 'Qual foi o primeiro presente que eu te dei?',
        answers: [
            {
                answer: 'Um creme.',
                correct: false,
            },
            {
                answer: 'Um ursinho.',
                correct: true,
            },
            {
                answer: 'Um acessório fashion.',
                correct: false,
            },
            {
                answer: 'Um almoço romântico.',
                correct: false,
            },
        ],
    },
    {
        question: 'O que eu mais amo em você?',
        answers: [
            {
                answer: 'Seu sorriso',
                correct: true,
            },
            {
                answer: 'O seu cabelo',
                correct: true,
            },
            {
                answer: 'Seu jeito único.',
                correct: true,
            },
            {
                answer: 'Sua inteligência.',
                correct: true,
            },
        ],
    },
    {
        question: 'Qual a cor favorita do seu namorado?',
        answers: [
            {
                answer: 'Azul',
                correct: true,
            },
            {
                answer: 'Vermelho',
                correct: false,
            },
            {
                answer: 'Verde',
                correct: false,
            },
            {
                answer: 'Amarelo',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual o prato favorito dele?',
        answers: [
            {
                answer: 'Lasanha',
                correct: false,
            },
            {
                answer: 'Pizza',
                correct: true,
            },
            {
                answer: 'Hambúrguer',
                correct: false,
            },
            {
                answer: 'Sushi',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual cidade eu mais quer visitar?',
        answers: [
            {
                answer: 'Nova Iorque',
                correct: false,
            },
            {
                answer: 'Nápoles',
                correct: false,
            },
            {
                answer: 'Tóquio',
                correct: false,
            },
            {
                answer: 'Xique-Xique, (Bahia)',
                correct: true,
            },
        ],
    },
    {
        question: 'Qual é o meu hobby preferido??',
        answers: [
            {
                answer: 'Leitura',
                correct: false,
            },
            {
                answer: 'Jogar videogame',
                correct: false,
            },
            {
                answer: 'Cozinhar',
                correct: true,
            },
            {
                answer: 'Desenhar',
                correct: false,
            },
        ],
    },
    {
        question: 'Seu namorado já teve todos esses, mas qual é o que ele mais ama??',
        answers: [
            {
                answer: 'Cachorro',
                correct: true,
            },
            {
                answer: 'Gato',
                correct: false,
            },
            {
                answer: 'Pássaro',
                correct: false,
            },
            {
                answer: 'Peixe',
                correct: false,
            },
        ],
    },
    {
        question: 'Qual é o estilo de música que eu mais escuto?!',
        answers: [
            {
                answer: 'Rock',
                correct: false,
            },
            {
                answer: 'Pop',
                correct: false,
            },
            {
                answer: 'Indie',
                correct: false,
            },
            {
                answer: 'Rap',
                correct: true,
            },
        ],
    },
];

// substituição do quizz para a primeira pergunta
function init() {
    // criar primeira pergunta
    createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
    // limpar questão anterior
    const oldButtons = answerBox.querySelectorAll('button');
    oldButtons.forEach((btn) => {
        btn.remove();
    });

    // alterar texto da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // inserir alternativas
    questions[i].answers.forEach((answer, i) => {
        // cria template botão quizz
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerText = answerTemplate.querySelector('.question-answer');

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute('correct-answer', answer['correct']);

        // remover hide e template class
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        // inserir alternativa na tela
        answerBox.appendChild(answerTemplate);

        // inserir evento click no botão
        answerTemplate.addEventListener('click', function () {
            checkAnswer(this);
        });
    });

    // incrementar o número da questão
    actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
    // seleciona todos os botões
    const buttons = answerBox.querySelectorAll('button');

    // verifica se resposta correta e add classe
    buttons.forEach((button) => {
        if (button.getAttribute('correct-answer') == 'true') {
            button.classList.add('correct-answer');

            // checa se usuário acertou a pergunta
            if (btn === button) {
                // incremento dos pontos
                points++;
            }
        } else {
            button.classList.add('wrong-answer');
        }
    });

    // exibir próxima pergunta
    nextQuestion();
}

// exibe a próxima pergunta no quizz
function nextQuestion() {
    // timer para usuário ver as respostas
    setTimeout(function () {
        // verifica se ainda há perguntas
        if (actualQuestion >= questions.length) {
            // apresenta mensagem de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);
    }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
    hideOrShowQuizz();

    // trocar dados tela de sucesso
    // calcular score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score span');
    displayScore.textContent = score.toString();

    // alterar o número de perguntas corretas
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    // alterar o total de perguntas
    const totalQuestions = document.querySelector('#questions-qty');
    totalQuestions.textContent = questions.length;
}

// mostra ou esconde o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
    // zerar jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
});

// inicialização do quizz
init();
