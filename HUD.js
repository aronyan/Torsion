/*
* 	Author;		
* 	Purpose; 	Modify the heads updisplay for the player 
*	Attachs;	h>HUD
*/
private var gameOver:boolean = false;

var currentHealth:float = 5;
var maxHealth:float = 5;

private var healthTexture: Texture2D;

//var blood:GUISkin;

private var hpBar:float;
var xpos = 50;
var ypos = 50;

var on:boolean = false;
var reset:boolean = false;

function Start()
{
	//healthTexture = new Texture2D(128, 128);
	healthTexture = Resources.Load("healthbar", typeof(Texture2D)) as Texture2D;
	healthTexture.wrapMode = TextureWrapMode.Repeat;
}

function Update(){
	if(on){
//		health++;
		currentHealth--;
		on = false;
	}
	
	if (reset){
		//health = 1;
		//hp = 5;
		currentHealth = 5;
		reset = false;
	}
}

// receive a MessagePlayerDie
function MessagePlayerDie()
{
	// wait for one second
	yield new WaitForSeconds(1.0);
	// now the game is over
	gameOver = true;
}

function SetHealth(hp:int){
	currentHealth = hp;
	maxHealth = hp;	
}

function PlayerDamage(damage:int){
	currentHealth += damage;
}

function OnGUI()
{
	// if the game is over
    GUI.backgroundColor = Color(0,0,0,0);
    GUI.contentColor = Color.white;
    
	if(currentHealth > 0){	
	    hpBar = (Screen.width - 200) * (currentHealth /maxHealth);
	
		var j = 0;
		if(currentHealth< maxHealth)	j = ((Screen.width - 200) * ((maxHealth - currentHealth) /maxHealth) / 2);
	
	    GUI.Box(new Rect(100 + j, 50, hpBar,Screen.height/10), healthTexture);//currentHealth + "/" + maxHealth);
	}
	
	if(gameOver)
	{
		// display a button in the center of the screen that says "Retry?"
		if(GUI.Button(Rect(Screen.width/2-100, Screen.height/2-50, 200, 100), "Retry?") || Input.GetKeyDown(KeyCode.R))
		{
			//load the scene called "Game"
			Application.LoadLevel("Game");
		}
	}
}