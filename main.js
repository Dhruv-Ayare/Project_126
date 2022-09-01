song1="";
song2="";

leftwristX=0;
leftwristY=0;

scoreLeftWrist=0;

song1_status="";
song2_status="";

rightwrsitX=0;
rightwrsitY=0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song1.isPlaying();
    fill("red");
    stroke("blue");
    if(scoreLeftWrist>0.2){
        circle(leftwristX,leftwristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Harry Potter Theme song";
        }
    }
}
function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+scoreLeftWrist);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftwristX+", Left Wrist Y = "+leftwristY);

        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightwristX+", Right Wrist Y = "+rightwristY);
    }
}