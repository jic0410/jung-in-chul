#!/usr/bin/env python
# coding: utf-8

# In[2]:


import numpy as np
import matplotlib.pyplot as plt

get_ipython().run_line_magic('precision', '3')
get_ipython().run_line_magic('matplotlib', 'inline')


# In[3]:


x_set = np.arange(2, 13)
y_set = np.arange(1, 7)


# In[4]:


def f_XY(x, y):
    if 1 <= y <=6 and 1 <= x - y <= 6:
        return y * (x-y) / 441
    else:
        return 0


# In[5]:


XY = [x_set, y_set, f_XY]


# In[6]:


prob = np.array([[f_XY(x_i, y_j) for y_j in y_set]
                 for x_i in x_set])

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111)

c = ax.pcolor(prob)
ax.set_xticks(np.arange(prob.shape[1]) + 0.5, minor=False)
ax.set_yticks(np.arange(prob.shape[0]) + 0.5, minor=False)
ax.set_xticklabels(np.arange(1, 7), minor=False)
ax.set_yticklabels(np.arange(2, 13), minor=False)
# y축을 내림차순의 숫자가 되게 하여, 위 아래를 역전시킨다
ax.invert_yaxis()
# x축의 눈금을 그래프 위쪽에 표시
ax.xaxis.tick_top()
fig.colorbar(c, ax=ax)
plt.show()


# In[7]:


np.all(prob >= 0)


# In[8]:


np.sum(prob)


# In[9]:


def f_X(x):
    return np.sum([f_XY(x, y_k) for y_k in y_set])


# In[10]:


def f_Y(y):
    return np.sum([f_XY(x_k, y) for x_k in x_set])


# In[11]:


X = [x_set, f_X]
Y = [y_set, f_Y]


# In[12]:


prob_x = np.array([f_X(x_k) for x_k in x_set])
prob_y = np.array([f_Y(y_k) for y_k in y_set])

fig = plt.figure(figsize=(12, 4))
ax1 = fig.add_subplot(121)
ax2 = fig.add_subplot(122)

ax1.bar(x_set, prob_x)
ax1.set_title('X_marginal probability distribution')
ax1.set_xlabel('X_value')
ax1.set_ylabel('probability')
ax1.set_xticks(x_set)

ax2.bar(y_set, prob_y)
ax2.set_title('Y_marginal probability distribution')
ax2.set_xlabel('Y_value')
ax2.set_ylabel('probability')

plt.show()


# In[13]:


np.sum([x_i * f_XY(x_i, y_j) for x_i in x_set for y_j in y_set])


# In[14]:


def E(XY, g):
    x_set, y_set, f_XY = XY
    return np.sum([g(x_i, y_j) * f_XY(x_i, y_j)
                   for x_i in x_set for y_j in y_set])


# In[15]:


mean_X = E(XY, lambda x, y: x)
mean_X


# In[16]:


mean_Y = E(XY, lambda x, y: y)
mean_Y


# In[17]:


a, b = 2, 3


# In[18]:


E(XY, lambda x, y: a*x + b*y)


# In[19]:


a * mean_X + b * mean_Y


# In[20]:


np.sum([(x_i-mean_X)**2 * f_XY(x_i, y_j)
       for x_i in x_set for y_j in y_set])


# In[21]:


def V(XY, g):
    x_set, y_set, f_XY = XY
    mean = E(XY, g)
    return np.sum([(g(x_i, y_j)-mean)**2 * f_XY(x_i, y_j)
                   for x_i in x_set for y_j in y_set])


# In[22]:


var_X = V(XY, g=lambda x, y: x)
var_X


# In[23]:


var_Y = V(XY, g=lambda x, y: y)
var_Y


# In[24]:


def Cov(XY):
    x_set, y_set, f_XY = XY
    mean_X = E(XY, lambda x, y: x)
    mean_Y = E(XY, lambda x, y: y)
    return np.sum([(x_i-mean_X) * (y_j-mean_Y) * f_XY(x_i, y_j)
                    for x_i in x_set for y_j in y_set])


# In[25]:


cov_xy = Cov(XY)
cov_xy


# In[26]:


V(XY, lambda x, y: a*x + b*y)


# In[27]:


a**2 * var_X + b**2 * var_Y + 2*a*b * cov_xy


# In[28]:


cov_xy / np.sqrt(var_X * var_Y)


# In[ ]:




