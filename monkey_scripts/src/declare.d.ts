import { MonitorController } from './monitor/monitor';

declare global {
  interface Window {
    _monitor_container_: MonitorController;
  }
}
