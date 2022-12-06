export function updateNodeElement (dom, vDom) {
  const newProps = vDom.props
  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    if (propName.slice(0, 2) === 'on') {
      // 事件绑定
      const eventName = propName.toLowerCase().slice(2)
      dom.addEventListener(eventName, newPropsValue)
    } else if (propName === 'value' || propName=== 'checked') {
      // 无法使用setAttribute设置属性
      dom[propName] = newPropsValue
    } else if (propName !== 'children') {
      if (propName === 'className') {
        dom.setAttribute('class', newPropsValue)
      } else {
        dom.setAttribute(propName, newPropsValue)
      }
    }
  })
}
