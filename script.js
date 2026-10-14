let currentAnswer = null;
let currentStreak = 0;

function updateStreak(isCorrect) {
    const streakDisplay = document.getElementById('streak-counter');
    
    if (isCorrect) {
        currentStreak++;
        streakDisplay.classList.add('bump');
        setTimeout(() => streakDisplay.classList.remove('bump'), 200);
    } else {
        currentStreak = 0;
    }
    
    streakDisplay.innerText = `🔥 Streak: ${currentStreak}`;
}

function generateProblem() {
    const content = document.getElementById('game-content');
    const optionsArea = document.getElementById('options');
    optionsArea.innerHTML = '';

    let opChoice = document.getElementById('operation-select').value;
    const ops = ['add', 'sub', 'mul', 'div'];
    
    if (opChoice === 'mix') {
        opChoice = ops[Math.floor(Math.random() * ops.length)];
    }

    let num1, num2, operator;

    if (opChoice === 'add') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = '+';
        currentAnswer = num1 + num2;

    } else if (opChoice === 'sub') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        if (num2 > num1) [num1, num2] = [num2, num1];
        operator = '-';
        currentAnswer = num1 - num2;

    } else if (opChoice === 'mul') {
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        operator = '×';
        currentAnswer = num1 * num2;

    } else if (opChoice === 'div') {
        let ans = Math.floor(Math.random() * 5) + 1;
        let divisor = Math.floor(Math.random() * 5) + 1;
        num1 = ans * divisor;
        num2 = divisor;
        operator = '÷';
        currentAnswer = ans;
    }

    content.innerHTML = `<div class="problem-area">${num1} ${operator} ${num2} = <span class="blank-space">?</span></div>`;

    let choices = [currentAnswer];
    
    while(choices.length < 3) {
        let offset = Math.floor(Math.random() * 5) + 1;
        let wrong = Math.random() > 0.5 ? currentAnswer + offset : currentAnswer - offset;
        if (wrong >= 0 && !choices.includes(wrong)) {
            choices.push(wrong);
        }
    }

    choices = choices.sort(() => Math.random() - 0.5);

    choices.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = num;
        btn.onclick = () => checkAnswer(num);
        optionsArea.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === currentAnswer) {
        updateStreak(true);
        const success = document.getElementById('success');
        success.classList.add('show');
        
        setTimeout(() => {
            success.classList.remove('show');
            generateProblem();
        }, 1500);
    } else {
        updateStreak(false);
        const optionsArea = document.getElementById('options');
        optionsArea.style.transform = 'translateX(-10px)';
        setTimeout(() => optionsArea.style.transform = 'translateX(10px)', 100);
        setTimeout(() => optionsArea.style.transform = 'translateX(0)', 200);
    }
}

generateProblem();