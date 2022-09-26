object = "";
status = "";

function start(){
    objectDetection = ml5.objectDetector('CocoSSD', modelLoadded);
    document.getElementById("result").innerHTML = "Status : Object Detecting";
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.position(400, 120);
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide()
} 
function modelLoadded(){
    console.log("Model Loaded");
    status = true;
}
function gotResults(error, results){
    if(error){
        console.log("error");
    }else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = ramdom(255);
        b = random(255);
        objectDetection.detect(video, gotResults);
        for(i = 0; i < object.length; i++){
            document.getElementById("result").innerHTML = "Status : Object Detected";
            document.getElementById("number-of-objects").innerHTML = "Number of objects detected : " + object.length;

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label +" "+ percent +" % ", object[i].x + 10, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}