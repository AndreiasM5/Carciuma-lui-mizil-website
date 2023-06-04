function showSnackbar(message,time) {
    // Create a snackbar element
    var snackbar = document.createElement("div");
    snackbar.className = "snackbar";
    snackbar.textContent = message;

    // Append the snackbar to the body
    document.body.appendChild(snackbar);

    // Show the snackbar
    snackbar.style.visibility = "visible";

    // After 5 seconds, hide and remove the snackbar
    setTimeout(function() {
      snackbar.style.visibility = "hidden";
      snackbar.remove();
    }, time*1000);


  }


function addRow(name, scor) {
  
    var table = document.getElementById("scoreTable");
    var row = table.insertRow(-1); // Insert row at the last position

    var nameCell = row.insertCell(0);
    var scoreCell = row.insertCell(1);

    nameCell.innerHTML = name;
    scoreCell.innerHTML = scor;

    row.addEventListener('click', function (e) {

        // se schimba treptat dimensiunea fontului numelui
        var computedStyle = window.getComputedStyle(nameCell);
        var currentFontSize = parseFloat(computedStyle.fontSize);
        var initialFontSize = currentFontSize;
        var targetFontSize = 24; // Valoarea țintă a dimensiunii fontului
        var step = 1; // Cantitatea de creștere în fiecare pas
        var interval = 10; // Intervalul în milisecunde între fiecare pas
      
        var timer = setInterval(function() {
          currentFontSize += step;
          nameCell.style.fontSize = currentFontSize + 'px';
      
          if (currentFontSize >= targetFontSize) {
            clearInterval(timer);
          }
        }, interval);

        setTimeout( () => {
            nameCell.style.fontSize = initialFontSize + 'px';
        }, 3000)

        // alert name and score
        alert(`Player: ${name}   Score: ${scor}`,7);
      });

    scoreCell.addEventListener('click', function (e) {
        alert(`Score: ${scor}`,4);
        e.stopPropagation();
      });

    const colors = ['redText', 'blueText','blackText']
    const randomColor = Math.floor(Math.random() * 3);
    nameCell.classList.add(colors[randomColor]);
    scoreCell.classList.add(colors[randomColor]);
  }

function addScoreInLocal(name,scor) {
    var scores = []
    let localScores = JSON.parse(localStorage.getItem('scores'));
    if(localScores !== null ) {
        var scores = localScores;
        console.log(scores);
    }

    scores.push([name,scor]);

    var listString = JSON.stringify(scores);
    localStorage.setItem('scores', listString);
    showSnackbar("Scor added");
}

function submitForm() {
    var inputName = document.getElementById("inputName");
    var inputScor = document.getElementById("inputScor");
    let name = inputName.value;
    let score =  inputScor.value
    const regexName = /^[a-zA-Z0-9]+$/;
    const regexScore = /^(?:100|[1-9][0-9]?|0)$/;

    if(regexName.test(name) && regexScore.test(score)) {
        addRow(name, score);
        addScoreInLocal(name, score);
    }
    
    else {
        showSnackbar("Name or Score not valid",5);
    }
   
}


function init() {
    let scores = JSON.parse(localStorage.getItem('scores'));
    console.log(scores);
    if(scores !== null) {
        for(let score of scores) {
            addRow(score[0], score[1]);
    }
    }

    document.addEventListener("keydown", function(event) {
      if (event.key === "s") {
        addRow("Serghei Mizil", 101);
        addScoreInLocal("Serghei Mizil", 101);
      }
    });
    
    var btnErase = document.getElementById("eraseBtn");
    btnErase.addEventListener('click', ()=> {
      localStorage.setItem('scores', null);
      var table = document.getElementById("scoreTable");
      while (table.rows.length > 0) {
        table.deleteRow(0);
      }

    })
    

}


init();
