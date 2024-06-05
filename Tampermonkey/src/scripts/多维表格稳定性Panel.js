class ScriptController {
  open = false
  constructor() {
    this.loadTimes = 0
  }

  bootstrap() {
    this.insertHTML()
    this.initEvent()
  }

  initEvent() {
    this.initTogglePanelEvent()
  }

  initTogglePanelEvent() {
    let preOpen = false
    let preClose = false
    let timer = null
    window.addEventListener('keypress', e => {
      if (e.key === '`') {
        if (this.open) {
          if (preClose) {
            this.open = false
            preClose = false
            clearTimeout(timer)
            timer = null
            this.panel.css('display', 'none')
          } else {
            preClose = true
            timer = setTimeout(() => {
              preClose = false
              clearTimeout(timer)
              timer = null
              console.log('###', '关闭超时')
            }, 500)
          }
          // 打开情况
        } else {
          if (preOpen) {
            preOpen = false
            this.open = true
            clearTimeout(timer)
            timer = null
            this.panel.css('display', 'flex')
            this.panel.find('.__SUPER_QUERY__').focus()
          } else {
            preOpen = true
            timer = setTimeout(() => {
              preOpen = false
              clearTimeout(timer)
              timer = null
              console.log('###', '打开超时')
            }, 500)
          }
        }
      }
    })
  }

  insertHTML() {
    $(':root').css({ fontSize: '12px' })

    this.panel = $(
      `
<div
  id="__BASE_PANEL__"
  data-theme="dark"
  style="
    position: fixed;
    z-index: 9999999999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
  "
>
  <div class="pico" style="width: 500px; overflow: hidden; font-size: 14px">
    <article>
      <header>
        <nav>
          <ul>
            <li><strong>多维表格稳定性插件</strong></li>
          </ul>
          <ul>
            <li><a href="#">Tea</a></li>
            <li><a href="#">Slardar</a></li>
            <li><a href="#">Birio</a></li>
          </ul>
        </nav>
        <input class="__SUPER_QUERY__" type="search" name="text" placeholder="超级检索" aria-label="Text" />
      </header>
      <div style="height: 300px"></div>
      <footer>Footer</footer>
    </article>
  </div>
</div>
`
    )
    document.body.appendChild(this.panel[0])
  }
}

window.__PANEL__ = new ScriptController()
window.__PANEL__.bootstrap()
