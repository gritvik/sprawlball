import csv
import names
import random

file_dir = "/Users/manas/Desktop/fa22-cs411-Q-team004-Team4/backend/data/players.csv"
playerIds = []
colleges = []
nationalities = []
heights = []
weights = []
positions = []

playerFile = open(file_dir, "r")
readPlayers = csv.reader(playerFile, delimiter=',')
final = []
for row in readPlayers:
    final.append(row)
    playerIds.append(row[0])
    colleges.append(row[2])
    nationalities.append(row[3])
    heights.append(row[4])
    weights.append(row[5])
    positions.append(row[6])

maxId = 1630994
for i in range(500):
    maxId+=1
    playerName = names.get_full_name(gender='male')
    college = random.choice(colleges)
    nationality = random.choice(nationalities)
    height = random.choice(heights)
    weight = random.choice(weights)
    position = random.choice(positions)
    draftYear = 'Undrafted'
    draftRound = 'Undrafted'
    draftPick = 'Undrafted'
    
    arr = [maxId, playerName, college, nationality, height, weight, position, draftYear, draftRound, draftPick]
    final.append(arr)

with open("players.csv", 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)

    writer.writerows(final)