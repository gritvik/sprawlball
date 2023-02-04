# from nba_api.stats.static import players

import csv

shot_data = open("shot_data.csv", "r")
reader = csv.DictReader(shot_data)
shots = list(reader)

player_dicts = []
player_IDs = []
for shot in shots:
    if shot["PLAYER_ID"] not in player_IDs:
        player_dicts.append(
            {"PlayerID": shot["PLAYER_ID"], "PlayerName": shot["PLAYER_NAME"]}
        )
        player_IDs.append(shot["PLAYER_ID"])

players_csv = open("players.csv", "w")
writer = csv.writer(players_csv)
writer.writerow(["PlayerID", "PlayerName"])
for player in player_dicts:
    writer.writerow(player.values())
players_csv.close()
