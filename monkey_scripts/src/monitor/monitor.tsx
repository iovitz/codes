import react, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { css } from '@emotion/react';

export class MonitorController {
  private container = this.initDom();

  constructor() {
    // setTimeout(() => {
    document.body.appendChild(this.container);
    // }, 2000);
  }

  initDom() {
    const container = document.createElement('div');
    container.id = `__MONITOR_DOM_CONTAINER__`;

    createRoot(container).render(
      <div
        css={css`
          height: 100%;
          width: 100%;
          background-color: black;
          color: red;
        `}
      ></div>
    );
    return container;
  }
}

const controller = new MonitorController();

// 挂到Window上
window._monitor_container_ = controller;
