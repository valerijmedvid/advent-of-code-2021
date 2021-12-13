with open("input_data.txt") as f:
    contents = f.readlines()
numbers = list(map(lambda x: int(x.strip()), contents))

previous = None
counter = 0

for index in range(len(numbers) - 2):
    current = 0
    for num in numbers[index : index + 3]:
        current += num

    if previous and previous < current:
        counter += 1
    previous = current

print(counter)
