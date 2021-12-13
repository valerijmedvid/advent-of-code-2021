with open("input_data.txt") as f:
    contents = f.readlines()

forward = 0
depth = 0
direction = 0

for line in contents:
    (command, dist_str) = line.strip().split(" ")
    distance = int(dist_str, 10)

    if command == "forward":
        forward += distance
        depth += direction * distance

    elif command == "down":
        direction += distance

    else:
        direction -= distance

result = forward * depth
print(result)
