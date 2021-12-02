with open("input_data.txt") as f:
    contents = f.readlines()

forward = 0
depth = 0


for line in contents:
    (movement, dist_str) = line.strip().split(" ")
    distance = int(dist_str, 10)

    if movement == "forward":
        forward += distance
    elif movement == "down":
        depth += distance
    else:
        depth -= distance

result = forward * depth
print(result)
