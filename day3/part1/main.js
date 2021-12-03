fs = require("fs")

let counter = {
  zero: [],
  one: [],
}
let gamma = []
let epsilon = []

fs.readFile("./input_data.txt", "utf8", (err, data) => {
  if (err) {
    throw err
  }

  function increase_counter(value_type, index) {
    if (counter[value_type][index]) {
      counter[value_type][index] += 1
    } else {
      counter[value_type][index] = 1
    }
  }

  numbers = data.split("\n")
  numbers.forEach((number) => {
    const binnary_num = number.split("")
    for (let i = 0; i < binnary_num.length; i++) {
      if (binnary_num[i] == "1") {
        increase_counter("one", i)
      } else {
        increase_counter("zero", i)
      }
    }
  })

  for (let y = 0; y < counter.zero.length; y++) {
    if (counter.zero[y] > counter.one[y]) {
      gamma[y] = "0"
      epsilon[y] = "1"
    } else {
      gamma[y] = "1"
      epsilon[y] = "0"
    }
  }

  console.log(parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2))
})
