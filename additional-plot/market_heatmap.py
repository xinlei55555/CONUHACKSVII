import numpy as np
import pandas as pd

with open('round_plot_data.txt') as f:
    lines = f.readlines()

areas = []
symbols = []
for i in lines:
    s = [j for j in i[1:].split()]
    symbols.append(s[0])
    areas.append([int(j) for j in s[1:]])

lst = np.arange(1, 241)
area_pd = pd.DataFrame(areas, columns=lst)
area_pd["symbol"] = symbols
# print(area_pd)

color_bin = [-1,-0.02,-0.01,0, 0.01, 0.02,1]
area_pd['colors'] = pd.cut(area_pd[1], bins=color_bin, labels=['red','indianred','lightpink','lightgreen','lime','green'])

import plotly.express as px

fig = px.treemap(area_pd, path=[px.Constant("all"), 'symbol'], values = 4, color='colors',
                 color_discrete_map ={'(?)':'#262931', 'red':'red', 'indianred':'indianred','lightpink':'lightpink', 'lightgreen':'lightgreen','lime':'lime','green':'green'})
fig.show()

