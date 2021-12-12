let playerFactory = function(name, mark) {
  let obj = Object.create({})
  obj.name = name
  obj.mark = mark
  return obj
}