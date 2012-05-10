/*
* 	Author;		
* 	Purpose; 	Destroy obstacles the player has passed
*	Attachs;	?
*/
function Update () {

	var ship = GameObject.Find("ship");
	
	if(ship != null && ship.transform.position.z > transform.position.z +100){
		Destroy(gameObject);
	}

}
