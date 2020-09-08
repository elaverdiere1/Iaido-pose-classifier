# Iaido-pose-classifier

# Problem Statement

It can be difficult to find time to train martial arts with a teacher.  This can be particular true during coronavirus or other social limitations.  My goal is to create a computer vision model that would be able to detect the pose of the practitioner. This could then be used to make sure the pose is correct that way the student can practice even when away from the dojo.

The data will be gathered from video of me doing the iaido kata and certain important poses will be classified that will then be used to create the classifier for use by other people.

# Summary

This project will use the p5.js web editor and the ml5.js neural network to create a pose classification model based on an Iaido kata so that a student might be able to practice with supervision even when they are unable to get to a dojo.

The pose classification will use the poseNet model to pinpoint specific locations on the person and get X and Y coordinates that are used in the neural network to train the model this can be seen is this image.

![poseNet](/images/1_7qDyLpIT-3s4ylULsrnz8A.png)

image from https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5

Video was recorded of 8 different poses, the video ran for 20 seconds on each pose and data was take over the course of that time.  The data was saved out and then used in the ml5 neural network for classification

The code was run in the local browser by putting this in the terminal when in the poses folder

python -m http.server

then opening the browser to the following address

http://localhost:8000/

This sets up a local browser with the pose classification so that it can be run locally on a computer

The 8 poses that the model is based on

![Seiza](/images/seiza_mea.jpg)

![horz](/images/horiz_cut.jpg)

![vert](/images/vert_cut.jpg)

![o_chiburi1](/images/O-chiburi1.jpg)

![o_chiburi2](/images/O-chiburi2.jpg)

![noto1](/images/noto1.jpg)

![noto2](/images/noto2.jpg)

![end](/images/end.jpg)

I included a jupyter notebook with some of my thought and a bit of exploration of the poseNet data that was used in the model for classification.

# Conclusion

Much of the work was done in a program call p5 and used javascript.  The model used was the ml5 neural network. documentation for it can be found here https://learn.ml5js.org/docs/#/reference/neural-network.  The training data was taken from my demonstration of the iaido kata and was used to classify the poses that could then be run by a student. The model was set to create 8 classified poses based on important points in the kata.  I had to use a series of different models to try and get a good working model.

Certain limitations of the model that I ran into include:
 - I was only using a built in webcam for my laptop so the mediocre image quality probably made the poseNet have trouble with pinpointing the points on the body
 - The clothing that is worn during iaido includes a hakama which is a long and loose pair of pants so it made it hard for the computer to detect the legs
 - some of the points in the kata are very close to each other and caused problems with classifying what were nearly similar poses
 - With some of the early models I tried to move around to get a range of locations for the x and y points but that caused problems because some of the poses were so close that the overlap caused the model to have problems
 - position in front of the camera was very important to replicating the pose as it relates to the x and y position
 
The model was able to classify the 8 poses well. The initial model was trained using my data and tested using the data from a student at my dojo.  The choice of test subect was based on the fact that he had a very different body shape to show the efficacy of the model using other data.  With the hakama the model was able to classify 7 of the 8 poses using a little work. Without the hakama the model classified all 8 poses with onlt some trouble. 

With more work the model could potentially be used beyond just iaido like other martial arts or even yoga to help people make sure they find the correct pose based on posture and position and allow for a sort of supervised training even without a trainer.

# Future Work

Creating a better display for the classifier that shows current step of the kata, next step, and if it is complete

Figuring out a way to make the model more robust so that it can detect even with a hakama

Adding more kata or other things to the classifier to expand the usage

# Reference

This project was helped greatly by the coding and information shown in a youtube series by The Coding Train.  This series helped with both learning the p5 library and using pose classification with ml5.  Link to one video in the series.
https://www.youtube.com/watch?v=FYgYyq-xqAw
