
export function diffProps(oldProps, newProps) {
  let updates = {}
  let removals = []

  for (let propName in newProps) {
    if (newProps[propName] !== oldProps[propName]) {
      updates[propName] = newProps[propName]
    }
  }

  for (let propName in oldProps) {
    if (!(propName in newProps)) {
      removals.push(propName)
    }
  }

  return { updates, removals }
}
