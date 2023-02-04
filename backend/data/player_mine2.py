import csv
from nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo

players_csv = open("players.csv", "r")
reader = csv.DictReader(players_csv)
player_list = list(reader)

player_dicts = []
player_IDs = []
for player in player_list:
    if player["PlayerID"] not in player_IDs:
        player_IDs.append(player["PlayerID"])
        player_info = commonplayerinfo.CommonPlayerInfo(player["PlayerID"])
        player_info = player_info.get_normalized_dict()
        player_info = player_info.get("CommonPlayerInfo")[0]
        print(player_info.get("DISPLAY_FIRST_LAST"))
        player_dicts.append(
            {
                "PlayerID": player["PlayerID"],
                "PlayerName": player_info.get("DISPLAY_FIRST_LAST"),
                "School": player_info.get("SCHOOL"),
                "Country": player_info.get("COUNTRY"),
                "Height": player_info.get("HEIGHT"),
                "Weight": player_info.get("WEIGHT"),
                "Years": player_info.get("SEASON_EXP"),
                "Position": player_info.get("POSITION"),
                "DraftYear": player_info.get("DRAFT_YEAR"),
                "DraftRound": player_info.get("DRAFT_ROUND"),
                "DraftPick": player_info.get("DRAFT_NUMBER"),
            }
        )


players_csv = open("players2.csv", "w")
writer = csv.writer(players_csv)
writer.writerow(["PlayerID", "PlayerName"])
for player in player_dicts:
    writer.writerow(player.values())
players_csv.close()
