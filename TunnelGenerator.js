/*
* 	Author;		
* 	Purpose; 	Create the tunnel the player files through
*	Attachs;	h>game processor
*/
class TunnelGenerator extends MonoBehaviour
{

	private var pipeCount:int = 0; //DONT USE THIS FOR POSITION ANY MORE.
	private var currentPosition: int = 0; //USE THIS
	private var pipeLength:int = 196;
	private var cavernLength:int = pipeLength*31;

	private var pipeWidth = 100;
	private var cavernWidth:int = pipeLength*300;
	
	private var currentTunnelSegmentName: String;
	private var lastPipe:GameObject;

	//ship
	private var ship:GameObject;
	
	
	//rotation for tunnel pieces
	private var rotationSpeed:float = 0;
	private var rotation:float = 0;
	

	//obstacle genrator values
	var beginPipeArray : GameObject[];
	var endPipeArray : GameObject[];
	var middlePipeArray: GameObject[];
	var cavernArray: GameObject[];
	var rootPipeArray: GameObject[]; //Note: These pieces must match up with ANY end, start, or cavern piece.
	var asteroidArray: GameObject[];

	enum TunnelState { BEGIN, MIDDLE, END, CAVERN, ROOT }
	private var numMiddlePieces:int;
	private var numRootPieces:int;

	private var tunnelState:TunnelState = TunnelState.ROOT; //always start with a root segment
	
	var stage = 0;//current stage / enviroment. currently unused


	var enemyArray : GameObject[];

	//powerups generator
	var powerups : GameObject[];
	var coins : GameObject;

	//spawner
	var coinSpawner = 0;
	private var enemySpawner = 0;



	function Start()
	{
		//obstacleArray = GameObject.FindGameObjectsWithTag("Obstacle");
		ship = GameObject.Find("ship");
		RandomGenerator();
		numRootPieces = 5;
	}
	
	public function getCurrentTunnelWidth()
	{
		if (tunnelState == TunnelState.CAVERN)
			return cavernWidth;
		else
			return pipeWidth;
	}

	
	function FixedUpdate()
	{
		rotationSpeed += Input.GetAxis("Horizontal") * 0.3;
		rotationSpeed *= 0.9;
		rotation += rotationSpeed;
		
		//transform.RotateAround(Vector3.zero,Vector3.forward, rotationSpeed );
		
		var pipeArray: Array = GameObject.FindGameObjectsWithTag("Pipe");
		
		var coinArray : Array = GameObject.FindGameObjectsWithTag("item");
		var enemmies : Array = GameObject.FindGameObjectsWithTag("Enemy");
		var asteroids : Array = GameObject.FindGameObjectsWithTag("Asteroid");
		var joinArray = coinArray.concat(enemmies).concat(asteroids);

		for (var pipe:GameObject in pipeArray)
		{
			pipe.transform.rotation.z = 0;
			pipe.transform.RotateAround(Vector3.zero,Vector3.forward, rotation );
		}
		
		for (var pipe:GameObject in joinArray)
		{
			pipe.transform.rotation.z = 0;
			pipe.transform.RotateAround(Vector3.zero,Vector3.forward, rotationSpeed );
		}
		
		
	}

	function Update () {
		
		if (ship == null)
			return;
				
		while(ship.transform.position.z > currentPosition - 6000) //increase to add more tunnels in front.
		{

			var prefab;
			var item:int;
			var piece: int = 0;
			var i:int;
			var lastState:TunnelState = tunnelState;
			var found:boolean = false;
			
			
			if (tunnelState == TunnelState.ROOT)
			{
				item = Random.Range(0,rootPipeArray.length);
				prefab = rootPipeArray[item];
				
				if (numRootPieces <= 0)
				{
					if (Random.value > 0.85)//0.85)
					{
						GenerateAsteroids();
						tunnelState = TunnelState.CAVERN;
					}
					else
						tunnelState = TunnelState.BEGIN;
				}
				numRootPieces--;
			}
			else if (tunnelState == TunnelState.BEGIN)
			{
				item = Random.Range(0,beginPipeArray.length);
				prefab = beginPipeArray[item];
				
				var name:String = prefab.name;
				
				currentTunnelSegmentName = name.Substring(0,name.Length - 6); //Subtract _Start from name!
				
				//Debug.Log("FIRST PIECE NAME IS " + currentTunnelSegmentName);
				
				tunnelState = TunnelState.MIDDLE;
				numMiddlePieces = Random.Range(2,4);
			}
			
			else if (tunnelState == TunnelState.MIDDLE)
			{
				//NB! no random piece inside middle or end. Pieces must match up
				
				for (i = 0; i < middlePipeArray.length; i++)
				{
					name = middlePipeArray[i].name;
					name = name.Substring(0,name.Length - 7);
					
					
					
					if (name == currentTunnelSegmentName) //_Middle
					{
						//Debug.Log("Middle match on piece" + i +" with " + name);
						piece = i;
						found = true;
						break;
					}
				}
				if (!found)
					Debug.Log("Middle PIECE NOT FOUND! " + currentTunnelSegmentName);
				item = piece;
				
				//item = Random.Range(0,middlePipeArray.length);
				prefab = middlePipeArray[item];
				if (numMiddlePieces <= 0) //or some other method
					tunnelState = TunnelState.END;
				numMiddlePieces--;
			}
			
			else if (tunnelState == TunnelState.END)
			{
				//NB! no random piece inside middle or end. Pieces must match up
				
				for (i = 0; i  < endPipeArray.length; i++)
				{
					name = endPipeArray[i].name;
					name = name.Substring(0,name.Length - 4);
					
					//Debug.Log("Comparing " + name + " to " + currentTunnelSegmentName);
					
					if (name == currentTunnelSegmentName) //_End
					{
						//Debug.Log("End match on piece" + i +" with " + name);
						piece = i;
						found = true;
						break;
					}
				}
				
				if (!found)
					Debug.Log("End PIECE NOT FOUND! " + currentTunnelSegmentName);
				
				item = piece;
				
				//item = Random.Range(0,endPipeArray.length);
				prefab = endPipeArray[item];
				
				//todo random Cavern OR start piece here
				tunnelState = TunnelState.ROOT;
				RandomizeNumRoots();
			}
			else if (tunnelState == TunnelState.CAVERN)
			{
				item = Random.Range(0,cavernArray.length);
				prefab = cavernArray[item];
				tunnelState = TunnelState.ROOT;
				RandomizeNumRoots();
			}
			
			var pipe:GameObject = Instantiate(prefab,Vector3(0, 0, currentPosition), Quaternion.identity);
			
			if (lastPipe != null)
			{
				pipe.transform.rotation = lastPipe.transform.rotation;
			}
			
			lastPipe = pipe;
			//pipe.transform.rotation.z = GameObject.Find("TunnelTurner"
			//var otherScript: OtherScript = GetComponent(OtherScript); 
			
			
			if (lastState == TunnelState.CAVERN)
				currentPosition += cavernLength;
			else
				currentPosition += pipeLength;
			
			
			
			
			
			//obstacle = GameObject.Instantiate(obstaclePrefab,Vector3(0, 0, 0), Quaternion.identity);
			//obstacle.transform.position.z = pipeLength * pipeCount;
			//var rot = Random.value * 360;
			//obstacle.transform.RotateAround(obstacle.transform.position,obstacle.transform.forward,rot);
			
			
			
			
			/*if ((pipeCount>5)&&(enemyArray.Length > 0) && (pipeCount%10==0))
			{
				//Debug.Log("creating enemy");
				var enemyItem:float = Random.Range(0,enemyArray.length);
				var enemyPrefab:GameObject = enemyArray[enemyItem];
				var enemy:GameObject = GameObject.Instantiate(enemyPrefab,Vector3(0, 0, 0), Quaternion.identity);
				enemy.transform.position.z = pipeLength * (pipeCount*3+ 0.8);
				enemy.transform.rotation.y = Mathf.PI;
			}*/
			
			pipeCount++;
		}	
		
		if(coinSpawner <= 0)	GenerateCoins();
		
		
		if(enemySpawner <= 0) 	GenerateEnemy();
		
		enemySpawner--;				
		coinSpawner--;
	}


	
	function GenerateEnemy(){
		/*var xpos  = Random.Range(0, 0);
		var ypos  = Random.Range(15, 30);
		var en = GameObject.Instantiate(enemyArray[Random.Range(0 , enemyArray.Length)], Vector3(xpos,ypos,currentPosition), Quaternion.identity);
		en.transform.rotation.y = 180;
		RandomGenerator();*/
	}

	function GenerateAsteroids()
	{
		for (var pos = currentPosition; pos < currentPosition + cavernLength; pos += cavernLength/20)
		{
			var item = Random.Range(0,asteroidArray.length);
			var prefab = asteroidArray[item];
		
			xpos = Random.Range(-1400, 1400);
			ypos = Random.Range(-1400,1400);
			var asteroid:GameObject = GameObject.Instantiate(prefab, Vector3(xpos,ypos,pos), Quaternion.identity);
			
			asteroid.transform.rotation.x = Random.Range(0,Mathf.PI*2);
			asteroid.transform.rotation.y = Random.Range(0,Mathf.PI*2);
			asteroid.transform.rotation.z = Random.Range(0,Mathf.PI*2);
			var scale:float = Random.value*6000;
			asteroid.transform.localScale += Vector3(scale,scale,scale);
			
			var torque:float = 310.1;
			asteroid.rigidbody.AddTorque(Vector3.up * torque*(Random.value-0.5));
			asteroid.rigidbody.AddTorque(Vector3.right * torque*(Random.value-0.5));
			asteroid.rigidbody.AddTorque(Vector3.forward * torque*(Random.value-0.5));

			var speed:float = 310.1;
			asteroid.rigidbody.AddForce(Vector3.up * speed*(Random.value-0.5));
			asteroid.rigidbody.AddForce(Vector3.right * speed*(Random.value-0.5));
			asteroid.rigidbody.AddForce(Vector3.forward * speed*(Random.value-0.5));
		
		}
	}
	
	function GenerateCoins(){
		var count = 0;
		var xpos = 0;
		var ypos = 0;
		var zpos = currentPosition;
		
		if(tunnelState == TunnelState.CAVERN){
			count  = Random.Range(50, 100);
			xpos = Random.Range(-1500, 1500);
			ypos = Random.Range(-1500,1500);
		}
		
		else{
			count = Random.Range(25, 50);
			xpos = Random.Range(-100,100);
			ypos = Random.Range(100, 100);
		}
		
		
		for( var i = 0; i < count; i++){
			var c = GameObject.Instantiate(coins, Vector3(xpos,ypos,zpos), Quaternion.identity);
			zpos += 20;
		}
		RandomGenerator();
	}
	
	function RandomizeNumRoots()
	{
		numRootPieces = Random.Range(1,3);
	}
	
	function RandomGenerator()
	{
		if(coinSpawner  <= 0)	coinSpawner = Random.Range(100, 300);
		
		if(enemySpawner <= 0)	enemySpawner = Random.Range(100, 300);
	}
}

