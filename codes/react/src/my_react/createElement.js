export function createElement (type, props, ...children) {
  const childElements = [...children].reduce((prev, child) => {
    if (child !== null && child !== false && child !== true) {
      if (child instanceof Object) {
        prev.push(child)
      } else {
        prev.push({
          type: 'text',
          children: [],
          props: {
            textContent: child,
          },
        })
      }
    }
    return prev
  }, [])
  return {
    type,
    props: Object.assign({children}, props),
    children: childElements,
  }
}
