const quizContainer = document.querySelector("#quiz")


const questions = [{
    question: "...",
      answers: {
        a: "....",
        b: "....",
        c: "....",
        d: "....."
      },
      correctAnswer: "d"
    },
    {
        question: "...",
          answers: {
            a: "....",
            b: "....",
            c: "....",
            d: "....."
          },
          correctAnswer: "d"
        },
        {
            question: "...",
              answers: {
                a: "....",
                b: "....",
                c: "....",
                d: "....."
              },
              correctAnswer: "d"
            },
            {
                question: "...",
                  answers: {
                    a: "....",
                    b: "....",
                    c: "....",
                    d: "....."
                  },
                  correctAnswer: "d"
                },
                {
                    question: "...",
                      answers: {
                        a: "....",
                        b: "....",
                        c: "....",
                        d: "....."
                      },
                      correctAnswer: "d"
                    }

]

      function createQuiz(){
        
      const output = [];
      questions.forEach(
        (currentQuestion, questionNumber) => {
          const answers = [];
          for(letter in currentQuestion.answers){
            let label = document.createElement("label")
            label.innerText = `${letter} 
              ${currentQuestion.answers[letter]}`
            let input = document.createElement("input")
            input.type = "radio",
            input.setAttribute=`question${questionNumber},${letter}`
            label.appendChild(input)
            answers.push(
        
              label.innerText = `${letter} 
              ${currentQuestion.answers[letter]}`
              
          );
          }
          let div1=document.createElement("div")
          div1.innerText=`${currentQuestion.question}`;
          let div2=document.createElement("div")
          div2.innerText=`${answers.join('')}`
          output.push(
            `${currentQuestion.question}`,`${answers.join('')}`
          );
        }
      );
      quizContainer.append(output.join(''));
    }
createQuiz()