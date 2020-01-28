
//Set Variables

$(document).ready(function(){

	
	var trivia = [{ 
		question: "Where was Kobe Bryant born?",
		lists: ["Los Angeles", "Philadelphia", "New York", "Paris"],
		answer: 1,
	}, {
		question: "What year was Kobe Bryant born?",
		lists: ["2002", "1960", "1948", "1978"],
		answer: 3,
	}, {
		question: "Which team did Kobe Bryant play for?",
		lists: ["LA Lakers", "Sacramento Kings", "Boston Celtics", "Miami Heat"],
		answer: 0,
	}, {
		question: "What was Kobe Bryant's Jersey Number?",
		lists: ["15", "24", "0", "85"],
		answer: 1,
	}, {
		question: "What year were the Lakers established?",
		lists: ["2015", "2001", "1947", "0BC"],
		answer: 2,
	}, {
		question: "At what age was Kobe Bryant first recruited to play basketball?",
		lists: ["17", "25", "30", "32"],
		answer: 0,
	}, {
		question: "How many times did Kobe Bryant hit a game winner?",
		lists: ["0", "1", "36", "15"],
		answer: 2,
	}, {
		question: "Kobe Bryant broke the NBA record for the most...",
		lists: ["Amazing Shots", "Missed Shots", "Missed Games", "3 Point Shots"],
		answer: 1,
	}, {
		question: "By the time Kobe was 23, he had...",
		lists: ["Struggled in the NBA", "Disliked Shaq", "Did not get the position he wanted", "Won three Consecutive Championships"],
		answer: 3,
	}, {
		question: "Bryant was a ______ for the LA Lakers?",
		lists: ["Shooting Guard", "Coach", "Intern", "Point Guard"],
		answer: 0
	}];

	    var questionOptions;
		var rightanswer;
		var wronganswer;
		var noAnswer;
		var seconds;
		var time;
		var answers;
		var selectionChoice;

		$("#startGame").on("click", function(){
			$("#startGame").hide();
			startGame();
		});

		function startGame(){
			$("#last").empty();
			$("#rightanswer").empty();
			$("#wronganswer").empty();
			$("#noAnswer").empty();
			questionOptions = 0;
			rightanswer = 0;
			wronganswer = 0;
			noAnswer = 0;
			nextQuestion();
		};

		function nextQuestion(){
			$("#popUps").empty();
			$("#answerReveal").empty();

			$("#questionOptions").html("Question # " + (questionOptions+1) + "/" + trivia.length);
			$(".question").html("<h2>" + trivia[questionOptions].question + "</h2>");

			for(var j = 0; j < 4; j++){
				var select = $("<div>");
				select.text(trivia[questionOptions].lists[j]);
				select.attr({"data-index" : j});
				select.addClass("choices");
				$(".answer").append(select);
			}

			timeRemaining();

			$(".choices").on("click", function(){
				selectionChoice = $(this).data("index");
				clearInterval(time);
				correctAnswer();
			})
		};

		function timeRemaining(){
			seconds = 20;
			$("#timer").html("<h2>Time Remaining:" + seconds + "</h2>");
			answers = true;
			time = setInterval(count, 1000);
		};

		function count(){
			seconds--;
			$("#timer").html("<h2>Time Remaining:" + seconds + "</h2>");
			if(seconds < 1){
				clearInterval(time);
				answers = false;
				correctAnswer();
			}
		};

		var message = {
			right: "Correct!",
			wrong: "Wrong!",
			last: "Try Again!",
			finalScore: "Done!"
		}

		
		function correctAnswer(){
			$("#questionOptions").empty();
			$(".choices").empty();
			$(".question").empty();

			var rightanswermatch = trivia[questionOptions].lists[trivia[questionOptions].answer];
			var rightmatch = trivia[questionOptions].answer;

			if ((selectionChoice == rightmatch) && (answers == true)){
				rightanswer++;
				$("#popUps").html(message.right);
			} else if ((selectionChoice != rightmatch) && (answers == true)){
				wronganswer++;
				$("#popUps").html(message.wrong);
				$("#answerReveal").html("Correct Answer: " + rightanswermatch);
			} else {
				noAnswer++;
				$("#popUps").html(message.leftTime);
				$("#anwserReveal").html("Correct Answer: " + rightanswermatch);
			}

			
			if (questionOptions == (trivia.length-1)){
				setTimeout(score, 2000)
			} else {
				questionOptions++;
				setTimeout(nextQuestion, 2000);
			}
		};
		

		function score(){
			$("#startGame").show();
			$("#timer").empty();
			$("#popUps").empty();
			$("#answerReveal").empty();

			$("#last").html(message.finalScore);
			$("#rightanswer").html("Right Answers: " + rightanswer);
			$("#wronganswer").html("Wrong Answers: " + wronganswer);
		
		};
});