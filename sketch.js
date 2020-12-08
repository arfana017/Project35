//Create variables here
var dog, happyDog, database, foodStock;
var foodS = 50;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");

}

function setup() {

  database = firebase.database();

	createCanvas(500, 500);
  
  dog = createSprite(250,250,30,30);
  dog.addImage(dogImage);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW) && foodS >= 1) {

    writeStock(foodS);
    happyDog = createSprite(350,360,30,30)
    happyDog.addImage(happyDogImage);

    dog.visible = false;

  if(keyWentUp(UP_ARROW)) {

      dog.visible = true;
      happyDog.visible = false;
      Food.visible = false;

    }

  if(foodS == 0) {

    dog.visible = true;
    foodS = 70;
  
  }

  }

  drawSprites();
  
  textSize(24);
  stroke("white");
  fill("white");
  text("Note: Press the Up Arrow Key To Feed Drago Milk!", 150,25);
  text("Food Remaining: "+ foodS, 300,200);

}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



