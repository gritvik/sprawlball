import csv

with open("shots.csv", "r") as fin, open("shotsnew.csv", "w") as fout:
    reader = csv.reader(fin)
    writer = csv.writer(fout)
    for idx, line in enumerate(reader, -1):
        output = [idx] + line[1:]
        writer.writerow(output)
