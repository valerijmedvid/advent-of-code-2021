const fs = require("fs")

const graph = {}

const INPUTS = fs
  .readFileSync("input_data.txt", "utf8")
  .split("\n")
  .map((x) => {
    const [from, to] = x.split("-")
    if (!graph[from]) {
      graph[from] = []
    }
    if (!graph[to]) {
      graph[to] = []
    }
    graph[from].push(to)
    graph[to].push(from)

    return { from, to }
  })

function isSmallCave(string) {
  return /[a-z]/.test(string)
}

function depthFirstSearch(node, visited, visitedTwiceAlready, paths) {
  visited.push(node)
  if (node === "end") {
    paths.push(visited.join`,`)
    return
  }

  for (const neighbor of graph[node]) {
    if (neighbor === "start") {
      continue
    }
    if (isSmallCave(neighbor) && visited.includes(neighbor)) {
      if (visitedTwiceAlready) {
        continue
      }
      if (visited.filter((x) => x === neighbor).length >= 2) {
        continue
      }
      depthFirstSearch(neighbor, [...visited], true, paths)
    } else {
      depthFirstSearch(neighbor, [...visited], visitedTwiceAlready, paths)
    }
  }
}

const paths = []
depthFirstSearch("start", [], false, paths)
console.log(paths.length)
