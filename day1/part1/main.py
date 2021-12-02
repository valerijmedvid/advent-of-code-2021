with open("input_data.txt") as f:
    contents = f.readlines()

previous = None
counter = 0

for line in contents:
    current = int(line.strip())

    if previous and previous < current:
        counter += 1
    previous = current

print(counter)
