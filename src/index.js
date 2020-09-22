import { parse } from "qs"

const result = parse("https://baidu.com?abc=123")

console.log(window?.abc)
console.log(result)
