/*
* 	Author;		
* 	Purpose; 	Code called to control the players ship
*	Attachs;	none
*/
class Ship extends MonoBehaviour
{
	//ship movement
	var velocity:float = 15;
	protected var acceleration:float = 0.2;
	protected var friction:float = 0.001;
	protected var upSpeed:float = 0;
	protected var upAcceleration:float = 0.1;
	protected var turnSpeed:float = 0.0;
	protected var turnAcceleration:float = 0.1;
	protected var forwardDirection : Vector3 = new Vector3(0.0, 0.0, 1.0);
	var prefabExplosion:GameObject;
	public var gameProcessor:GameObject;

	//shooting
	var prefabBullet:Transform;
	protected var shootForce:float = 4500;
	//protected var shipScript: Player;
	
	function Start () {
	if(transform.collider.rigidbody != null)	rigidbody.freezeRotation = true;

	}
	
	
	function Shoot()
	{
		for (var i = 0; i < 1; i++)
		{
			var instanceBullet = Instantiate(prefabBullet, transform.position, Quaternion.identity);
			Physics.IgnoreCollision(instanceBullet.collider, transform.collider);
			instanceBullet.rigidbody.AddForce(transform.forward * shootForce*velocity);
			instanceBullet.transform.rotation = transform.rotation;
			instanceBullet.transform.position += transform.forward * 3* velocity;
		}
	}

	function MoveUp()
	{
		if(upSpeed < 4)
			upSpeed += upAcceleration;	
	}
	
	function ForceMoveUp(forceUp:int)
	{
		if(upSpeed < 4)
			upSpeed += upAcceleration;	
	}
	
	function ForceMoveDown(forceDown:int)
	{
		if(upSpeed > -4)
			upSpeed -= forceDown;
	}
	
	function MoveDown()
	{
		if(upSpeed > -4)
			upSpeed -= upAcceleration;
	}
	
	function TurnLeft()
	{
		if(turnSpeed>-2)
			turnSpeed -= turnAcceleration;	
	}
	function TurnRight()
	{
		if(turnSpeed<2)
			turnSpeed += turnAcceleration;	
	}
	

	
	function ProcessShip()
	{
		turnSpeed *= 0.98;
		
		upSpeed -= upSpeed * friction;
		turnSpeed -= turnSpeed * friction*2;
		velocity += acceleration * Time.fixedDeltaTime;
		
		PushToCentre();

		transform.position += forwardDirection * velocity;
		transform.position += transform.up * upSpeed;
		//transform.rotation.eulerAngles.z += turnSpeed;
		transform.RotateAround(Vector3(0,0,transform.position.z), Vector3.forward, turnSpeed);
	}
	
	
	
	function PushToCentre()
	{
		var centrepos = Vector3(0,0, transform.position.z);
		var distanceToCentre = Vector3.Distance(transform.position,centrepos);
		var directionToCentre = centrepos - transform.position;
		directionToCentre.Normalize();
		
		//var tunnelSize:float = 200;
		var tunnelGenerator:TunnelGenerator = gameProcessor.GetComponent(typeof(TunnelGenerator));
		
		var tunnelSize:float = tunnelGenerator.getCurrentTunnelWidth();
		
		
		//Push player closer to centre
		if (distanceToCentre > 0)
		{
			var upDistance = Vector3.Distance(transform.position + transform.up,centrepos);
			var downDistance = Vector3.Distance(transform.position - transform.up,centrepos);
			
			var multiplier = 0.5;
			var distanceMultiplier = (distanceToCentre*0.01) / tunnelSize;
			var upSpeedMultiplier = -Mathf.Abs(upSpeed) * 0.03;
			
			if (upDistance < downDistance)
				upSpeed += upAcceleration*multiplier*distanceMultiplier;
			else
				upSpeed -= upAcceleration*multiplier*distanceMultiplier;
		}
	}
}