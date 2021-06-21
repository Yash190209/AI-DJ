var song="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialised");
}
function draw(){
    image(video,0,0,600,500);
    fill("#301934");
    stroke("#301934");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        inNumberLeftWristY=Number(leftWristY);
        remove_decimals=floor(leftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
        }
        if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
            }
            if(rightWristY>200 && rightWristY<=300){
                document.getElementById("speed").innerHTML="speed=1.5x";
                song.rate(1.5);
                }
                if(rightWristY> 300 && rightWristY<=400){
                    document.getElementById("speed").innerHTML="speed=2x";
                    song.rate(2);
                    }
                    if(rightWristY>400 && rightWristY<=500){
                        document.getElementById("speed").innerHTML="speed=2.5x";
                        song.rate(2.5);
                        }
    }
}
function play(){
    song.play();
    
}
function gotPoses(results){
if (results.length>0){
    console.log(results)
    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist="+scoreRightWrist+"scoreLeftWrist="+scoreLeftWrist);

    rightWristX=results[0].pose.rightWrist.x;
    leftWristX=results[0].pose.leftWrist.x;
    rightWristY=results[0].pose.rightWrist.y
    leftWristY=results[0].pose.leftWrist.y;
    console.log("right wrist x="+rightWristX+"right wrist y="+rightWristY+"left wrist x="+leftWristX+"left wrist y="+leftWristY);
    
}
}