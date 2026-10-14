function generateProblem() {
    const content = document.getElementById('game-content');
    const optionsArea = document.getElementById('options');
    optionsArea.innerHTML = '';

    if (currentMode === 'math') {
        // Randomly choose between addition (true) and subtraction (false)
        const isAddition = Math.random() > 0.5;
        
        // Generate two numbers between 1 and 5
        let num1 = Math.floor(Math.random() * 5) + 1;
        let num2 = Math.floor(Math.random() * 5) + 1;
        let operator = '+';
        
        if (isAddition) {
            currentAnswer = num1 + num2;
        } else {
            // For subtraction, make sure the first number is bigger to avoid negative answers
            if (num2 > num1) {
                let temp = num1;
                num1 = num2;
                num2 = temp;
            }
            operator = '-';
            currentAnswer = num1 - num2;
        }

        content.innerHTML = `<div class="problem-area">${num1} ${operator} ${num2} = <span class="blank-space">?</span></div>`;

        // Generate 3 choices (1 correct, 2 wrong)
        let choices = [currentAnswer];
        let wrong1 = currentAnswer + 1;
        // If the answer is 0, avoid generating -1 as a wrong choice
        let wrong2 = currentAnswer === 0 ? 2 : currentAnswer - 1; 

        choices.push(wrong1, wrong2);
        choices = choices.sort(() => Math.random() - 0.5); // Shuffle the buttons

        choices.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = num;
            btn.onclick = () => checkAnswer(num);
            optionsArea.appendChild(btn);
        });

    } else {
        // Generate Word Problem (Unchanged)
        const wordData = words[Math.floor(Math.random() * words.length)];
        const letterArray = wordData.word.split('');
        currentAnswer = letterArray[wordData.missingIndex];
        
        // Replace missing letter with a blank space
        letterArray[wordData.missingIndex] = '<span class="blank-space">&nbsp;</span>';

        content.innerHTML = `
            <div class="word-hint">${wordData.hint}</div>
            <div class="problem-area" style="letter-spacing: 10px;">${letterArray.join('')}</div>
        `;

        // Render option buttons
        let choices = [...wordData.options].sort(() => Math.random() - 0.5);
        choices.forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = letter;
            btn.onclick = () => checkAnswer(letter);
            optionsArea.appendChild(btn);
        });
    }
}