const timeType = 'YYYY-MM-DD HH:mm:ss';
import { App } from 'vue';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
function utcFormat(time: string, timeTypeParams: string = timeType) {
  return dayjs.utc(time).utcOffset(8).format(timeTypeParams);
}
function timestamp(time: string, timeTypeParams: string = timeType) {
  return dayjs(time).format(timeTypeParams);
}
export default function timeFormat(app: App) {
  app.config.globalProperties.$utcFormat = utcFormat;
  app.config.globalProperties.$timestamp = timestamp;
}
