from matplotlib import pyplot as plt
from matplotlib.animation import FuncAnimation
import random
import numpy as np

with open('round_plot_data.txt') as f:
    lines = f.readlines()

areas = []
symbols = []
for i in lines:
    s = [j for j in i[1:].split()]
    symbols.append(s[0])
    areas.append([int(j) for j in s[1:]])


fig = plt.figure(figsize=(35,30))

x = []
y = []
colors = []
for i in range(240):
    x.append(random.randint(0, 100))
    y.append(random.randint(0, 100))
    colors.append(np.random.rand(1))

print("colors", colors)
def animation_func(i):

    plt.xlim(0, 100)
    plt.ylim(0, 100)

    plt.clf()
    # plt.scatter(x, y, c=colors, s=areas[i], alpha=0.5, label=symbols)
    # plt.legend()
    # plt.title(sum(areas[i]))
    # print(areas[i])

    # plt.annotate(symbols, (x, y))

    # for j in range(len(symbols)):
    #     plt.annotate(symbols[j], (x[j], y[j]))

    for j in range(len(areas[i])):
        # print(colors[j][0])
        plt.scatter(x[j], y[j], c=plt.cm.hot(colors[j]), s=areas[i][j]*15, alpha=0.5, label=symbols[j])
        plt.annotate(symbols[j], (x[j], y[j]), fontsize=4)

    # plt.legend()
    plt.title("Total Ongoing Transactions: " +str(sum(areas[i])))
    plt.axis("off")




animation = FuncAnimation(fig, animation_func, interval=250)

plt.show()
