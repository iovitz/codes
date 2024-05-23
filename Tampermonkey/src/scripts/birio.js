class ScriptController {
  constructor() {
    this.loadTimes = 0
  }

  bootstrap() {
    this.initTimer()
  }

  initTimer() {
    const timer = setInterval(() => {
      const selectPageOption = $('.data-space .ud__pagination-options .ud__select__selector .ud__select__selector__selectItem')
      if (selectPageOption) {
        if (selectPageOption.text() !== '100 条/页') {
          const $select = $('.data-space .ud__pagination-options .ud__select__selector')
          if ($select) {
            $select.click()
            $('.data-space .ud__pagination-options .rc-virtual-list-holder-inner > div:nth-child(4) > div')?.click?.()
          }
        }
      }
    }, 1000)
  }
}

window.__sc__ = new ScriptController()
window.__sc__.bootstrap()
