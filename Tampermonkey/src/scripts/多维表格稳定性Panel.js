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

  insertHTML() {
    $(':root').css({ fontSize: '12px' })

    this.controlPanel = $(
      `<div class="pico" style="z-index: 999999999; position: fixed; left: 0px; bottom: 0px;">
  <button class="secondary" id="load-button">停止加载</button>
</article>
</div>
`
    )

    document.body.appendChild(this.controlPanel[0])
    this.switchLoadStatusButton = this.controlPanel.find('#load-button')
  }
}

window.__PANEL__ = new ScriptController()
window.__PANEL__.bootstrap()
