// ==UserScript==
// @name         多维表格稳定性Panel
// @namespace    https://github.com/iovitz
// @version      0.0.0
// @description  {{ date }}
// @author       iovitz
// @match        https://www.baidu.com/
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     picoCSS https://cdn.jsdelivr.net/npm/iovitz-cdn@1.0.3/dist/pico.conditional.css
// @require      https://cdn.jsdelivr.net/npm/iovitz-cdn@1.0.4/dist/monkey_script.js
// ==/UserScript==

const unsafeWindow = window?.unsafeWindow
const scopeWindow = unsafeWindow ? (unsafeWindow.window === unsafeWindow ? unsafeWindow : window) : window

GM_addStyle(GM_getResourceText('picoCSS'))

const { $, mousetrap } = scopeWindow.__MONKEY_SCRIPTS__

const HTML = `<div
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
"
>
<div class="pico" style="width: 500px; font-size: 14px">
<article>
<header>
  <nav>
    <ul>
      <li><strong>多维表格稳定性插件</strong></li>
    </ul>
    <ul>
      <li>
      <details class="dropdown">
        <summary>
          Account
        </summary>
        <ul dir="rtl">
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </details>
      </li>
    </ul>
  </nav>
  <input class="__SUPER_QUERY__ mousetrap" type="search" name="text" placeholder="超级检索" aria-label="Text" />
</header>
<div style="height: 300px"></div>
<footer>

  <nav>
    <ul>
      <li><a href="#">Tea</a></li>
      <li><a href="#">Slardar</a></li>
      <li><a href="#">Birio</a></li>
      <li><a href="#">Birio新</a></li>
    </ul>
  </nav>
</footer>
</article>
</div>
</div>
`

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
    mousetrap.bind('command command', this.togglePanel)
    mousetrap.bind('esc esc', this.closePanel)
    mousetrap.stopCallback = () => {
      return false
    }
  }

  togglePanel = () => {
    if (this.open) {
      this.closePanel()
    } else {
      this.openPanel()
    }
  }
  openPanel = () => {
    if (this.open) return
    this.open = true
    this.panel.css('display', 'flex')
    this.panel.find('input.__SUPER_QUERY__').focus()
    this.panel.find('input.__SUPER_QUERY__').val('')
    console.info('###打开Panel')
  }
  closePanel = () => {
    if (!this.open) return
    this.open = false
    this.panel.css('display', 'none')
    console.info('###关闭Panel')
  }

  insertHTML() {
    $(':root').css({ fontSize: '12px' })

    this.panel = $(HTML)
    document.body.appendChild(this.panel[0])
  }
}

window.__PANEL__ = new ScriptController()
window.__PANEL__.bootstrap()
