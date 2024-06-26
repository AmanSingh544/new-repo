export function hasChildren(item) {

  const { item: children } = item;

  if (children === undefined) {
    return false;
  }
  else if (children.constructor !== Array) {
    return false;
  }
  else if (children.length === 0) {
    return false;
  }
  else {
    return true;
  }

}
