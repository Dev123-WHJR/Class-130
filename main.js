song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;






function preload()
{
  song = loadSound("music.mp3"); 
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

  function modelLoaded()
  {
    console.log('PoseNet is initialised');
  }


function draw()
{
  image(video, 0, 0, 600, 500);
  fill("#FF0000");
  stroke("#FF0000");
if (scoreLeftWrist > 2)
{
  circle(leftWristX, leftWristY, 20);

  InnumberleftWristY = Number(leftWristY);
  remove_decimals = floor(InnumberleftWristY);
 left_wrist_y_divideby_1000 = remove_decimals/1000;
 volume = left_wrist_y_divideby_1000*2;
  document.getElementById("Volume").innerHTML = "Volume = " + volume;
  song.setVolume(volume);
}
 function playSong()
{ song.play();
  song.setVolume(1);
  song.rate(1);
}

function gotPoses(results)
{
  if (results.length > 0 )
  {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("ScoreLeftWrist = " + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left wrist x  = " + leftWristX + "Left wrist y = " + leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right wrist x  = " + rightWristX + "Right wrist y = " + rightWristY);
  }

}