import FullCalendar from 'rc-calendar';
import React from 'react';
import ReactDOM from 'react-dom';
import 'rc-calendar/assets/index.css';
import 'react-popover';
import 'rc-select/assets/index.css';
import Select from 'rc-select';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function onSelect(value) {
  console.log('select', value.format(format));
}
export default class MayaCalendar extends React.Component {
    constructor(props){
        super(props);
    };
 render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <FullCalendar
          style={{ margin: 10 }}
          fullscreen={false}
          onSelect={onSelect}
          defaultValue={now}
        />
      </div>
    );
  }
}
