
let brain;

function setup() {
  createCanvas(640, 480);
  let options = {
    inputs: 34,
    outputs: 8,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  brain.loadData('iaido5.json', dataReady);
}

function dataReady() {
  brain.normalizeData();
  brain.train({epochs: 70}, finished); 
}

function finished() {
  console.log('model trained');
  brain.save();
}