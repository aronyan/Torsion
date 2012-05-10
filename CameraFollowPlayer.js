#pragma strict
/*
* 	Author;		
* 	Purpose; 	Main game camera follows the players ship
*	Attachs;	h>Camera
*/
var distance:int;
var height:int;
var ship:GameObject;
var centre:int;

function Start () {
	centre = 0;
	camera.backgroundColor = Color.black;
}

function FixedUpdate () {
	ship = GameObject.Find("ship");
	if(ship != null){
	
//		if(ship.transform.position.y > centre + 5 ){
//			transform.position.y = ship.transform.position.y - height;
//		}
//		else{
//			transform.position.y = ship.transform.position.y+ height;
//		}
		
		transform.position = ship.transform.position;
		transform.rotation = ship.transform.rotation;
		
		//transform.position.y = 0;
		//transform.position.x = 0;
		
		transform.position -= transform.forward*25;
		transform.position += transform.up*10;
		
		
		
		//transform.LookAt(ship.transform);
		
		/*transform.position.z = ship.transform.position.z;
		transform.position.y = 0;
		transform.position.x = 0;
		transform.position.z -=  distance;
		transform.rotation = ship.transform.rotation;
		transform.LookAt(ship.transform);*/
		//transform.rotation.eulerAngles.z = ship.transform.rotation.eulerAngles.z;
	}
	
}