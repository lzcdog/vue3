import createElement from './createElement';
import timeFormat from './timeFormat';

import { App } from 'vue';

export default function (app: App): void {
  createElement(app);
  timeFormat(app);
}
