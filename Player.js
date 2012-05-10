/*
* 	Author;		
* 	Purpose; 	Recieve inputs and send commands to ship
*				Send collision commands
*	Attachs;	ship
*/
class Player extends Ship
{
	private var health:int = 3;
	
	function Start(){
		GameObject.Find("HUD").SendMessage("SetHealth" , health);
		//rigidbody.ForceMode = ForceMode.Impulse;
		rigidbody.freezeRotation = true;	
	}
	
	function Update () 
	{
		if(Input.GetKeyDown(KeyCode.Space))
		{
			//shipScript = GetComponent(Player);
			
			Shoot();
		}
		
		if(health <= 0){
			Instantiate(prefabExplosion, transform.position, Quaternion.identity);
			GameObject.Find("Score").SendMessage("isDead");
			gameObject.Find("HUD").SendMessage("MessagePlayerDie");
			Destroy(gameObject);
		}
	}

	function FixedUpdate () {

		
		
		if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow))
		{
			MoveUp();
		}
		
		else if (Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow))
		{
			MoveDown();
		}
		
//		if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow))
//		{
//			TurnLeft();
//		}
//		else if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow))
//		{
//			TurnRight();
//		}
		
		ProcessShip();
	}

	function OnCollisionEnter(other : Collision)
	{ 
		if (other.gameObject.CompareTag("Pipe")) 
		{ 
			health--;
			GameObject.Find("HUD").SendMessage("PlayerDamage", -1);
			if(transform.position.y > 0){
				ForceMoveDown(5);
				Debug.Log("pool");/*transform.position.y -= 30;*///gameObject.rigidbody.AddForce(transform.up * -500);
			}
			else{
				ForceMoveUp(10);
				Debug.Log("kool");
			}/*transform.position.y += 30;*///gameObject.rigidbody.AddForce(transform.up * 500);
		}
		
		if(other.gameObject.CompareTag("Enemy")){
			health--;
			GameObject.Find("HUD").SendMessage("PlayerDamage", -1);
			Destroy(other.gameObject);
		}
		
		if(other.gameObject.CompareTag("Asteroid")){
			health--;
			GameObject.Find("HUD").SendMessage("PlayerDamage", -1);
			other.collider.rigidbody.AddExplosionForce(100, other.transform.position, 5.0, 3.0);
			
		}
		
		if(other.gameObject.CompareTag("Laser")){
			health--;
			GameObject.Find("HUD").SendMessage("PlayerDamage", -1);
			Destroy(other.gameObject);
		}
	}
	
	function OnTriggerEnter(other:Collider){
		if(other.gameObject.CompareTag("item")){
		GameObject.Find("Score").SendMessage("addPoints", 1000);
		Destroy(other.gameObject);
		}
	}
}