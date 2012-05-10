/*
* 	Author;		
* 	Purpose; 	Give the player a score
*	Attachs;	h>Score
*/
var alive = true;
var score:float = 0;

function Start () {

}

function FixedUpdate () {
	if(alive && Time.timeScale == 1){
		score+=0.5;
		guiText.text = "" + parseInt(score);// * Time.smoothDeltaTime;
	}
}

function addPoints(points:int){
	score += points;
}

function isDead(){
	alive = false;
}