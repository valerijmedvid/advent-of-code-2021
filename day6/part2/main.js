fs = require("fs")
let input = ""
try {
  input = fs.readFileSync("./input_data.txt", "utf8").split(",")
} catch (err) {
  console.error(err)
}

let days = []
for (let day = 0; day <= 8; day++) {
  days.push(0)
}
input.forEach((fish) => {
  days[fish] += 1
})

for (let day = 0; day < 256; day++) {
  let newBorn = days[0]
  days[0] = days[1]
  days[1] = days[2]
  days[2] = days[3]
  days[3] = days[4]
  days[4] = days[5]
  days[5] = days[6]
  days[6] = days[7] + newBorn

  days[7] = days[8]
  days[8] = newBorn
}

console.log(
  days.reduce((prev, curr) => {
    return prev + curr
  }, 0)
)
