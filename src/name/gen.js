import animals from "./animals"

const rand = (n) => Math.floor(
    Math.random() * n
)
const gen = () => Array
    .from(
        { length: 3 },
        () => animals[rand(animals.length)]
    )
    .join("-")
    .replace(/ /g, "-")

export default gen
