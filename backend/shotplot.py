import requests
import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import urllib.request
# import seaborn as sns
import json
from matplotlib.patches import Circle, Rectangle, Arc
import sys

input = sys.argv[1]
# print(input)
shots = json.loads(input)


plt.style.use("dark_background")


def draw_court(ax=None, color="w", lw=2, outer_lines=False):
    # If an axes object isn't provided to plot onto, just get current one
    if ax is None:
        ax = plt.gca()

    # Create the various parts of an NBA basketball court

    # Create the basketball hoop
    # Diameter of a hoop is 18" so it has a radius of 9", which is a value
    # 7.5 in our coordinate system
    hoop = Circle((0, 0), radius=7.5, linewidth=lw, color=color, fill=False)

    # Create backboard
    backboard = Rectangle((-30, -7.5), 60, -1, linewidth=lw, color=color)

    # The paint
    # Create the outer box 0f the paint, width=16ft, height=19ft
    outer_box = Rectangle((-80, -47.5), 160, 190, linewidth=lw, color=color, fill=False)
    # Create the inner box of the paint, widt=12ft, height=19ft
    inner_box = Rectangle((-60, -47.5), 120, 190, linewidth=lw, color=color, fill=False)

    # Create free throw top arc
    top_free_throw = Arc(
        (0, 142.5),
        120,
        120,
        theta1=0,
        theta2=180,
        linewidth=lw,
        color=color,
        fill=False,
    )
    # Create free throw bottom arc
    bottom_free_throw = Arc(
        (0, 142.5),
        120,
        120,
        theta1=180,
        theta2=0,
        linewidth=lw,
        color=color,
        linestyle="dashed",
    )
    # Restricted Zone, it is an arc with 4ft radius from center of the hoop
    restricted = Arc((0, 0), 80, 80, theta1=0, theta2=180, linewidth=lw, color=color)

    # Three point line
    # Create the side 3pt lines, they are 14ft long before they begin to arc
    corner_three_a = Rectangle((-220, -47.5), 0, 140, linewidth=lw, color=color)
    corner_three_b = Rectangle((220, -47.5), 0, 140, linewidth=lw, color=color)
    # 3pt arc - center of arc will be the hoop, arc is 23'9" away from hoop
    # I just played around with the theta values until they lined up with the
    # threes
    three_arc = Arc((0, 0), 475, 475, theta1=22, theta2=158, linewidth=lw, color=color)

    # Center Court
    center_outer_arc = Arc(
        (0, 422.5), 120, 120, theta1=180, theta2=0, linewidth=lw, color=color
    )
    center_inner_arc = Arc(
        (0, 422.5), 40, 40, theta1=180, theta2=0, linewidth=lw, color=color
    )

    # List of the court elements to be plotted onto the axes
    court_elements = [
        hoop,
        backboard,
        outer_box,
        inner_box,
        top_free_throw,
        bottom_free_throw,
        restricted,
        corner_three_a,
        corner_three_b,
        three_arc,
        center_outer_arc,
        center_inner_arc,
    ]

    if outer_lines:
        # Draw the half court line, baseline and side out bound lines
        outer_lines = Rectangle(
            (-250, -47.5), 500, 470, linewidth=lw, color=color, fill=False
        )
        court_elements.append(outer_lines)

    # Add the court elements onto the axes
    for element in court_elements:
        ax.add_patch(element)

    return ax


# f = open("data/test.json")
# shots = json.load(f)
made_shots = []
missed_shots = []
for shot in shots:
    if shot["ShotMade"] == 1:
        made_shots.append(shot)
    elif shot["ShotMade"] == 0:
        missed_shots.append(shot)

made_df = pd.DataFrame(made_shots)
missed_df = pd.DataFrame(missed_shots)

plt.figure(figsize=(6, 5.5))
draw_court()
plt.scatter(made_df.LocationX, made_df.LocationY, marker="o", c="green")
plt.scatter(missed_df.LocationX, missed_df.LocationY, marker="x", c="red")


# Descending values along th y axis from bottom to top
# in order to place the hoop by the top of plot
plt.ylim(422.5, -47.5)
# get rid of axis tick labels
plt.tick_params(labelbottom=False, labelleft=False)
plt.savefig("shotplot.png")
# plt.show()


# # we pass in the link to the image as the 1st argument
# # the 2nd argument tells urlretrieve what we want to scrape
# url = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/"
# player_id = 1628960
# player_url = url + str(player_id) + ".png"
# player_png = str(player_id) + ".png"

# pic = urllib.request.urlretrieve(
#     player_url,
#     player_png,
# )

# # urlretrieve returns a tuple with our image as the first
# # element and imread reads in the image as a
# # mutlidimensional numpy array so matplotlib can plot it
# player_pic = plt.imread(pic[0])
