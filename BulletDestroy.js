/*
* 	Author;		
* 	Purpose; 	Destroy bullets 
*	Attachs;	project>prefabs>laser perfabs>laser
*/

var destroyTime:int = 5; // This is the time in seconds
var prefabExplosion:GameObject;
function Start(){

yield WaitForSeconds(destroyTime);
Destroy(gameObject);
}


function OnTriggerEnter(other : Collider)
{ 
	
	
	if (other.gameObject.CompareTag("Pipe")) 
	{ 
		//Debug.Log("LASER CRASHED");
		//prefabExplosion = GameObject.Find("ExplosionPlayer");
		Instantiate(prefabExplosion, transform.position, prefabExplosion.transform.rotation);
		//GameObject.Find("Score").SendMessage("addPoints", 50000);
		gameObject.transform.DetachChildren();
		
		//Destroy(other.gameObject);  Can't destroy these... hmm
		Destroy(gameObject);
	}
}