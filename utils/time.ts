export function getNow() {
  const now = new Date()
  return `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(now.getDate())} ${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`
}

function addZero(num: number) {
  return num < 10 ? `0${num}` : num.toString()
}
