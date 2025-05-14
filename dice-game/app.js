
// Тоглогч хадгалах хувьсагч 0 бол player 1, 1 бол player 2 global хувсагчид
var activePlayer;
var scores;
var roundScore;
var cubeNumber;

// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч 
var isGameOver;

// html tag ruu handah bol..
// document.querySelector('#score-1').innerHTML = "<em>Yeahh</em>";

// Шооны зургийг үзүүлэх элементийн DOM-оос хайж олоод энд хадгалсан
var cubeDom = document.querySelector(".dice");
initGame();
// Тоглоом эхлүүлэх
function initGame(){
    // Тоглоом эхэллээ төлөвт орно
    isGameOver = false;

    activePlayer = 0;
    // Тоглогчийн оноог хадгалах хувьсагч
    scores = [0,0];
    // Тоглогчийн ээлжиндэээ цуглуулж байгаа оноог хадгалах хувьсагч 
    roundScore = 0;

    // Шооны тоог хадгалах хувьсагч
    cubeNumber = 0;

    //Програм эхлэх
    // getElementById нь querySelector хурдан ажилдаг
    window.document.getElementById('score-0').textContent = '0';
    // window.document.querySelector('#score-0').textContent = 0;   
    window.document.getElementById('score-1').textContent = '0';
    window.document.getElementById('current-0').textContent = '0';
    window.document.getElementById('current-1').textContent = '0';

    // Тоглогчдийн нэрийг хэвийн болгох
    document.getElementById("name-0").textContent = "PLAYER 1";
    document.getElementById("name-1").textContent = "PLAYER 2";

    // 
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    // 
    document.querySelector(".player-"+ activePlayer+"-panel").classList.add("active");

    // Зургийг алга болгоно
    cubeDom.style.display = "none";
}


// anonymous function Шоо шидэх эвент
document.querySelector(".btn-roll").addEventListener('click', function(){

    if(isGameOver === false){
        // 1-6 хүртэлх тоог гаргаж ирнэ
        var cubeNumber = Math.floor(Math.random() * 6) + 1;
        // зургийг гаргаж ирнэ
        cubeDom.style.display = "block";
        // зургийн буусан тооны дугуу өөрчилнө
        cubeDom.src = 'dice-' + cubeNumber + '.png'; 
        // 
        if(cubeNumber !== 1){
            roundScore = roundScore + cubeNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }else{
            // Тоглогчийн ээлж солино
            switchToNextPlayer()
        }
    }else{
        alert("GameOver");
    }
});

// Hold товчны эвент
document.querySelector('.btn-hold').addEventListener('click', function(){
   if(isGameOver === false){
         // Уг тоглогчийн ээлжний оноонд нэмж өгнө
        scores[activePlayer] = scores[activePlayer] + roundScore;

        // Дэлгэцэн дээрх оноог нь өөрчлөнө
        document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];

        // тоглогч хожсон үгүйг шалгах
        if(scores[activePlayer] >= 10){
            // Тоглоом дууссан төлөвт оруулна
            isGameOver = true;
            // player iig winner bolgoh
            document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        } else{
         // Тоглогчийн ээлж солино
        switchToNextPlayer()
     }
   }else{
    alert("game over");
   }
    
});

// Энэ функц нь дараачийн тоглогч руу шилжүүлнэ 
function switchToNextPlayer(){
    // Ээлжийн оноог 0 болгоно
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    // тоглогчийн тоглох эрхийг шилжүүлнэ. 
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');

    // Шоог түр алга болгоно
    cubeDom.style.display = "none";
}

// шинээр эхлүүлэх
document.querySelector('.btn-new').addEventListener('click',initGame);