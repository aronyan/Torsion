/*
* 	Author;		
* 	Purpose; 	Enemy to shoot / shoot at player 
*	Attachs;	project>prefabs>enemy prefabs>enemy1
*/
class Enemy1 extends Ship
{
	var shoot = 0;
	function FixedUpdate()
	{		
		if (shoot > 50)
		{
			Shoot();
			shoot = 0;
		}
		shoot++;	
	
	}
}