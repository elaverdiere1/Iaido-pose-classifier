let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = " ";
let poseConfidence = 0;

function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 8,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model4/model4.json',
    metadata: 'model4/model_meta4.json',
    weights: 'model4/model.weights4.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  
  if (results[0].confidence > 0.75) {
    if(results[0].label == 'a'){
      poseLabel = 'Seiza Mae'
    } else if(results[0].label == 'b'){
      poseLabel = 'Yoko ichi monji'
    } else if(results[0].label == 'c'){
      poseLabel = 'Kirioroshi'
    } else if(results[0].label == 'd'){
      poseLabel = 'O-chiburi 1'
    } else if(results[0].label == 'e'){
      poseLabel = 'O-chiburi 2'
    } else if(results[0].label == 'f'){
      poseLabel = 'Noto 1'
    } else if(results[0].label == 'g'){
      poseLabel = 'Noto 2'
    } else if(results[0].label == 'h'){
      poseLabel = 'End'
    } else{
      poseLabel = results[0].label.toUpperCase();
    }
  } else {
    poseLabel = " ";
  }
  poseConfidence = Math.round(results[0].confidence * 100);
  classifyPose();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  fill(255, 0, 0);
  noStroke();
  textSize(60);
  textAlign(LEFT, CENTER);
  text(poseLabel, 75, 75);
  text(poseConfidence, 75, 150)  
}