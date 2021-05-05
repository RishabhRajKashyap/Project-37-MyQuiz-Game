class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("lightblue");

    //write code to show a heading for showing the result of Quiz
    fill(0);
    textSize(31);
    text("Result of the Quiz", 340, 50);
    text("-------------------------------", 310, 65);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      debugger;
      var display_Answers = 230;

    //write code to add a note here
    fill("blue");
    textSize(18);
    text("NOTE: Contestant who answered correctly is highlighted in green colour", 130, 222);

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      debugger;
      var correctAnswer = "4";
      if(correctAnswer === allContestants[plr].answer){
        fill("green");
      } else {
        fill("red");
      }

      display_Answers += 30;
      textSize(13);
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 250, display_Answers);
    }
    
    }

  }
}