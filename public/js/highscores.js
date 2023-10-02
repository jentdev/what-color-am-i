document.addEventListener('DOMContentLoaded', getScore);

let tdNames = document.getElementsByClassName('name');
let tdScores = document.getElementsByClassName('score');

async function getScores() {
    try {

        const res = await fetch(`https://api-color-scores-production.up.railway.app/scores/10`);
        const data = await res.json();
        // loop through json and store urls in no arr
        for (let i = 0; i < data.length; i++) {
            tdNames[i].innerText = `${data[i].name}`;
            tdScores[i].innerText = `${(data[i].score).toFixed(2)}`;
        }
    }
    catch(error) {
        console.log(error);
    }

}