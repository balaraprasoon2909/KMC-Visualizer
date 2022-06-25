# KMC-Visualizer
Web Visualizer for the K-means Clustering Unsupervised Learning algorithm

## Introduction
K-means clustering is a method of vector quantization, originally from signal processing, that aims to partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean (cluster centers or cluster centroid), serving as a prototype of the cluster. (Wikipedia)

## Tutorial
There is no particular tutorial for this project except for this readme file. The following points sum up the salient features of this visualiser:

- The visualiser implements the K-means clustering algorithm in a 2D grid, where "points" on the grid are grouped into clusters based on their positions. This grouping can be seamlessly extrapolated into single or multiple, space, time and other dimensions.
- On opening the webpage, you shall see a grid, on which you can place points wherever you like. These shall be the points which will be clustered by the algorithm. Single-click to place points individually in more precise positions; Click-and-drag to place entire clusters fast without much accuracy.
- When the algorithm executes, it finds the clusters to which each point best belongs and at the end, predicts the number of clusters frawn on the screen (given that they are less than 9). You will also see a cost graph (not drawn to scale) for each value of K (number of clusters)
- The guess for the number of clusters is given automatically by the Elbow method.
- There are 3 buttons on the bottom right of the screen (purposely made less visible to cause the least distraction):
  - Reset: Used to reset the entire canvas. In this case it is equivalent to a page reload but should be faster
  - Add: Used to add 100 points randomly onto the screen. This can be used to "confuse" the algorithm. It is interesting to note the changes in the resultant cost graph with increasing confusion
  - Play: Used to execute the algorithm.
