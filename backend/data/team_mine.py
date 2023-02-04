from nba_api.stats.static import teams
import csv

teams_dicts = teams.get_teams()

teams_csv = open("teams.csv", "w")
writer = csv.writer(teams_csv)
writer.writerow(
    ["id", "Name", "Abbreviation", "Nickname", "City", "State", "YearFounded"]
)
for team in teams_dicts:
    writer.writerow(team.values())
teams_csv.close()
