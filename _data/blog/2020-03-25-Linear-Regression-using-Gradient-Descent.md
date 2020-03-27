---
title: Linear Regression using Gradient Descent
date: 2020-03-25T12:46:37.121Z
template: BlogPost
usesKatex: true
draft: false
path: /posts/linear-regression-using-gradient-descent
category: Machine Learning
thumbnail: /assets/lin-reg-post/thumb.png
tags:
  - Machine Learning
  - Linear Regression
  - Gradient Descent
  - Mathematics
description: Linear Regression using Gradient Descent from scratch
---

Our objective is to find the best fit line for a bunch of data points.

![Gradeint descent](/assets/lin-reg-post/animation1.gif)

## Linear Regression

In statistics, linear regression is a linear approach to modelling the relationship between a dependent variable and one or more independent variables.
Let **X** be the independent variable and **Y** be the dependent variable. We will define a linear relationship between these two variables as follows:

$Y = mX + c$  
![mxplusc](http://www.nabla.hr/SlopeInterceptLineEqu.gif)

This is the equation for a line that you studied in high school. **m** is the slope of the line and **c** is the y intercept. Today we will use this equation to train our model with a given dataset and predict the value of **Y** for any given value of **X**.

Our challenege today is to determine the value of **m** and **c**, such that the line corresponding to those values is the best fitting line or gives the minimum error.

## Loss function

The loss is the error in our predicted of **m** and **c**. Our goal is to minimize this error to obtain the most accurance value of **m** and **c**.  
We will use the Mean Squared Error function to calculate the loss. There are three steps in this function:

1. Find the difference between the actual y and predicted y value(y = mx + c), for a given x.
2. Square this difference.
3. Find the mean of the squares for every value in X.
   $$
   \text{MSE} = \frac{1}{n} \sum_{i=1}^n (y_{true} - y_{pred})^2
   $$

Here $y_i$ is the actual value and $\bar y_i$ is the predicted value. Lets substitue the value of $\bar y_i$

$$
E = \frac{1}{n} \sum_{i=0}^n (y_i - (mx_i + c))^2
$$

So we square the error and find the mean. hence the name Mean Squared Error.
Now that we have defined the loss function, lets get into the interesting part - minimizing it and finding **m** and **c**

## The Gradient Descent Algorithm

Gradient descent is an iterative optimization algorithm to find the minimum of a function. Here that function is our Loss Function.
**Understanding Gradient Descent**
![valley](/assets/lin-reg-post/valley-illustration.jpg)

Imagine a valley and a person with no sense of direction who wants to get to the bottom of the valley. He goes down the slope and takes large steps when the slope is steep and small steps when the slope is less steep. He decides his next position based on his current position and stops when he gets to the bottom of the valley which was his goal.
Let's try applying gradient descent to **m** and **c** and approach it step by step:

1. Initially let m = 0 and c = 0. Let L be our learning rate. This controls how much the value of **m** changes with each step. L could be a small value like 0.0001 for good accuracy.
2. Calculate the partial derivative of the loss function with respect to m, and plug in the current values of x, y, m and c in it to obtain the derivative value **D**.
   $$
   D_m = \frac{1}{n} \sum_{i=0}^n 2(y_i - (mx_i + c))(-x_i)
   $$
   $$
   D_m = \frac{-2}{n} \sum_{i=0}^n x_i(y_i - \bar y_i)
   $$
   $D_m$ is the value of the partial derivative with respect to **m**. Similarly lets find the partial derivative with respect to **c**, $D_c$ :
   $$
   D_c = \frac{-2}{n} \sum_{i=0}^n (y_i - \bar y_i)
   $$
3. Now we update the current value of **m** and **c** using the following equation:

   $$
   m = m - L \times D_m
   $$

   $$
   c = c - L \times D_c
   $$

4. We repeat this process untill our loss function is a very small value or ideally 0 (which means 0 error or 100% accuracy). The value of **m** and **c** that we are left with now will be the optimum values.

Now going back to our analogy, **m** can be considered the current position of the person. **D** is equivalent to the steepness of the slope and **L** can be the speed with which he moves. Now the new value of **m** that we calculate using the above equation will be his next positon, and $L \times D$ will be the size of the steps he will take. When the slope is more steep (**D** is more) he takes longer steps and when it is less steep (**D** is less), he takes smaller steps. Finally he arrives at the bottom of the valley which corresponds to our loss = 0.
We repeat the same process above to find the value of **c** also. Now with the optimum value of **m** and **c** our model is ready to make predictions !

## Implementing the Model

Now let's convert everything above into code and see our model in action !

```python
import numpy as np

# Input and Output data
x = np.array([-40, -10,  0,  8, 15, 22],  dtype=float)
y = np.array([-40,  14, 32, 46, 59, 72],  dtype=float)

# Define error function
def error(y_hat):
  return np.mean(np.square(y-y_hat)) # Means Squared Error b/w Actual and Predicted Output

# Hyperparameters
m = 1
c = 5
learning_rate = 0.001 # The learning Rate
epochs = 3000 # The number of iterations to perform gradient descent

n = len(x)
error_vals = []

# Performing Gradient Descent
for i in range(epochs):
  # Forward propagation (basically multiplication)
  y_hat = m*x + c # The current predicted value of Y

  # Calculate Mean Squared Error
  error_vals.append(error(y_hat))

  # Find the Gradients
  de_dm = (-2/n) * np.sum(x * (y - y_hat)) # Derivative of error function wrt m
  de_dc = (-2/n) * np.sum(y - y_hat) # Derivative of error function wrt c

  # Back propagation (update the weights)
  m = m - (de_dm * learning_rate)
  c = c - (de_dc * learning_rate)

# Now check the slope and intercept value
print(c) # 31.934677394134408
print(m) # 1.8021320545942183

# Predict
print(m * 38 + c) # 100.4156954687147

# Predicted values and Actual Values
y_hat = m*x + c
print(y_hat) # Predictions
print(error(y_hat)) # 0.05572622807250253

```

### You can see the value error decreases as the number of epochs (cycles) increases.

x-axis (epochs) and y-axis (error)

![Error](/assets/lin-reg-post/error.png)
