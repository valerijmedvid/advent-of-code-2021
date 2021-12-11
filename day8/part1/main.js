fs = require("fs")
let input = ""
try {
  input = fs
    .readFileSync("./input_data.txt", "utf8")
    .split("\n")
    .map((x) => {
      return x
        .split(" | ")[1]
        .split(" ")
        .map((y) => {
          return y.length
        })
    })
} catch (err) {
  console.error(err)
}

console.log(input)

num7 = 0
num4 = 0
num1 = 0
num8 = 0

input.forEach((line) => {
  line.forEach((num) => {
    if (num == 3) {
      num7 += 1
    } else if (num == 4) {
      num4 += 1
    } else if (num == 2) {
      num1 += 1
    } else if (num == 7) {
      num8 += 1
    }
  })
})

console.log(num7 + num4 + num1 + num8)
