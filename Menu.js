/*
* 	Author;		
* 	Purpose; 	Display the menu 
*	Attachs;	?
*/
#pragma strict
public var imageSeqTexture: GUITexture;
private var currentImageNum:int = 0;
private var count: int = 0;

private var MAX_FRAMES: int = 120;
private var numImages: int = 94;


function Start () {
	imageSeqTexture.gameObject.active = true;
	imageSeqTexture.pixelInset = Rect (-Screen.width/2, -Screen.height/2, Screen.width, Screen.height);
}

function Update () {

	if (currentImageNum > numImages) 
	{  
	
		
		var alpha:float = parseFloat(MAX_FRAMES - currentImageNum) / parseFloat(MAX_FRAMES-numImages);
		
		imageSeqTexture.color = Color(alpha,alpha,alpha,1);
	
		if (currentImageNum > MAX_FRAMES) 
		{  
			Application.LoadLevel("Game");
			//imageSeqTexture.gameObject.active = false;
			return;
		}
	}
	else
	{
		var numberString:String = ""+currentImageNum;
		while (numberString.Length < 3)
		{
			numberString = "0"+numberString;
		}
		var imageName = "Comp 1_00"+numberString+"";
		Debug.Log("Loading " + imageName);
		imageSeqTexture.texture = Resources.Load(imageName, typeof(Texture2D)) as Texture2D;
		//oObj.renderer.material.mainTexture = Resources.Load("tester1", typeof(Texture2D)) as Texture2D;
	}
	
	//Comp 1_00000.jpg
	if (count%2 == 0)
		currentImageNum++;
	count++;
}