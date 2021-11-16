current_status = "";

img = "";
objects = [];

function preload(){
    img = loadImage("table.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects...";

}

function draw(){
    image(img, 0, 0, 640, 420);
    if(current_status != ""){
        for(i = 0; i < objects.length; i++){
            console.log("Hello World.");
            document.getElementById("status").innerHTML = "Status:Objects detected.";
            document.getElementById("recogniser").innerHTML = "Detector has detected objects.";
            percent = floor(objects[i].confidence * 100);
            stroke("ff0000");
            fill("#ff0000");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#13fc03");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("The model 'CocoSSD' is succesfully initialized.");
    current_status = true;
    object_Detector.detect(img, gotResults);
}

function gotResults(error,results){
    if(error){
        console.error();
        document.getElementById("recogniser").innerHTML = "Error_Code:2271. Check console for details.";
    }else{
        console.log(results);
        objects = results;
        document.getElementById("recogniser").innerHTML = "Recognising complete."
    }
}