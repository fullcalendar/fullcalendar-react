
export function diffProps(oldProps, newProps) {
  let updates = {}
  let removals = []
  let anyChanges = false

  for (let propName in newProps) {
    if (newProps[propName] !== oldProps[propName]) {
      updates[propName] = newProps[propName]
      anyChanges = true
    }
  }

  for (let propName in oldProps) {
    if (!(propName in newProps)) {
      removals.push(propName)
      anyChanges = true
    }
  }

  return { updates, removals, anyChanges }
}
