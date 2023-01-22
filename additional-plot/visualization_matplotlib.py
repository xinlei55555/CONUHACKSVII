import pandas as pd
from matplotlib import pyplot as plt
from matplotlib.animation import FuncAnimation
import random
import numpy as np
import pandas as pd
import pyodbc as pyo

with open('round_plot_data.txt') as f:
    lines = f.readlines()

areas = []
symbols = []
for i in lines:
    s = [j for j in i[1:].split()]
    symbols.append(s[0])
    areas.append([int(j) for j in s[1:]])

# areas_T = np.array(areas).T
lst = np.arange(1, 241)
# print(len(areas))
area_pd = pd.DataFrame(areas, columns=lst, index=symbols)
print(area_pd)

# area_sorted = area_pd.sort_values(by=240)
# print(area_sorted)
# print(area_pd)
# print(symbols)

# x = []
# y = []
# colors = []

fig = plt.figure(figsize=(15, 10))
def animation_func(i):
    x = []
    y = []
    colors = []
    for j in range(len(areas[i])):
        x.append(random.randint(0, 100))
        y.append(random.randint(0, 100))
        colors.append(np.random.rand(1))
        area = areas[i][j]
    plt.xlim(0, 100)
    plt.ylim(0, 100)
    plt.scatter(x, y, c=colors, s=area, alpha=0.5)


animation = FuncAnimation(fig, animation_func, interval=1000)

plt.show()
# for i in range(318):
#     animation_func(areas[i], symbols)
#     plt.show()

# print(sum(areas[3]))

# fig.canvas.set_window_title("Sales per symbol")

# np.random.seed(42)
# for i in range(1, 241):
#     # plt.scatter(area_pd[i])
#     x = []
#     y = []
#     colors = []
#     for j in range(len(areas[i])):
#         x.append(random.randint(0, 100))
#         y.append(random.randint(0, 100))
#         colors.append(np.random.rand(1))
#         area = area_pd[i].iloc[j]
#     plt.xlim(0, 100)
#     plt.ylim(0, 100)
#     plt.scatter(x, y, c=colors, s=area, alpha=0.5)
#
#     if i == 0:
#         plt.show()
#     else:
#         fig.canvas.draw()
#     plt.pause(1)
