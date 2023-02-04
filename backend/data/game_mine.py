import csv

shot_data = open("shot_data.csv", "r")
reader = csv.DictReader(shot_data)
shots = list(reader)

game_dicts = []
game_IDs = []
for shot in shots:
    if shot["GAME_ID"] not in game_IDs:
        game_dicts.append(
            {
                "GAME_ID": shot["GAME_ID"],
                "HomeTeam": shot["HTM"],
                "AwayTeam": shot["VTM"],
                "Date": shot["GAME_DATE"],
            }
        )
        game_IDs.append(shot["GAME_ID"])

games_csv = open("games.csv", "w")
writer = csv.writer(games_csv)
writer.writerow(["GAME_ID", "HomeTeam", "AwayTeam", "Date"])
for game in game_dicts:
    writer.writerow(game.values())
games_csv.close()
