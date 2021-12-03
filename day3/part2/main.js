fs = require("fs")
let numbers = []
try {
  numbers = fs.readFileSync("./input_data.txt", "utf8").split("\n")
} catch (err) {
  console.error(err)
}

let oxygen = numbers
let co2 = numbers
let indexesCount = numbers[0].split("").length

function get_count(nums, i) {
  let zero = 0
  let one = 0
  nums.forEach((x) => {
    if (x[i] == "0") {
      zero += 1
    } else {
      one += 1
    }
  })
  return { zero: zero, one: one }
}

for (let i = 0; i < indexesCount; i++) {
  let counter = get_count(oxygen, i)
  let biggerValue = counter.zero < counter.one || counter.zero == counter.one ? "1" : "0"
  if (oxygen.length > 1) {
    oxygen = oxygen.filter((x) => x[i] == biggerValue)
  }
}

for (let i = 0; i < indexesCount; i++) {
  let counter = get_count(co2, i)
  let biggerValue = counter.zero < counter.one || counter.zero == counter.one ? "0" : "1"
  if (co2.length > 1) {
    co2 = co2.filter((x) => x[i] == biggerValue)
  }
}

oxygen_dec = parseInt(oxygen.join(""), 2)
co2_dec = parseInt(co2.join(""), 2)

console.log(oxygen_dec * co2_dec)
