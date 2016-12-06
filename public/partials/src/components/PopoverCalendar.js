import React, { PropTypes} from 'react';
import DateTable from 'rc-calendar/lib/date/DateTable';
import MonthTable from 'rc-calendar/lib/month/MonthTable';
import CalendarMixin from 'rc-calendar/lib/mixin/CalendarMixin';
import CommonMixin from 'rc-calendar/lib/mixin/CommonMixin';
import CalendarHeader from 'rc-calendar/lib/full-calendar/CalendarHeader';
import PopoverDateTable from './PopoverDateTable.js';
function onSelect(value) {
  console.log('select', value.format(format));
}

const PopoverCalendar = React.createClass({
  propTypes: {
    defaultType: PropTypes.string,
    type: PropTypes.string,
    prefixCls: PropTypes.string,
    locale: PropTypes.object,
    onTypeChange: PropTypes.func,
    fullscreen: PropTypes.bool,
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    showTypeSwitch: PropTypes.bool,
    Select: PropTypes.func.isRequired,
    headerComponents: PropTypes.array,
    headerComponent: PropTypes.object, // The whole header component
    headerRender: PropTypes.func,
    showHeader: PropTypes.bool,
    disabledDate: PropTypes.func,
  },
  mixins: [CommonMixin, CalendarMixin],
  getDefaultProps() {
    return {
      defaultType: 'date',
      fullscreen: false,
      showTypeSwitch: true,
      showHeader: true,
      onTypeChange() {
      },
    };
  },
  getInitialState() {
    let type;
    if ('type' in this.props) {
      type = this.props.type;
    } else {
      type = this.props.defaultType;
    }
    return {
      type,
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('type' in nextProps) {
      this.setState({
        type: nextProps.type,
      });
    }
  },
  onMonthSelect(value) {
    this.onSelect(value, {
      target: 'month',
    });
  },
toggle (toState = null) {
    this.setState({ isOpen: toState === null ? !this.state.isOpen : toState })
  },
  setType(type) {
    if (!('type' in this.props)) {
      this.setState({
        type,
      });
    }
    this.props.onTypeChange(type);
  },
  render() {
    const props = this.props;
    const {
      locale,
      prefixCls,
      fullscreen,
      showHeader,
      headerComponent,
      headerRender,
      disabledDate,
    } = props;
    const { value, type } = this.state;

    let header = null;
    if (showHeader) {
      if (headerRender) {
        header = headerRender(value, type, locale);
      } else {
        const TheHeader = headerComponent || CalendarHeader;
        header = (
          <TheHeader
            key="calendar-header"
            {...props}
            prefixCls={`${prefixCls}-full`}
            type={type}
            value={value}
            onTypeChange={this.setType}
            onValueChange={this.setValue}
          />
        );
      }
    }

    const table = type === 'date' ? (
      <PopoverDateTable
        dateRender={props.dateCellRender}
        contentRender={props.dateCellContentRender}
        locale={locale}
        prefixCls={prefixCls}
        onSelect={this.onSelect}
        value={value}
        disabledDate={disabledDate}
		onMouseClick={this.toggle}
		Select={Select}
      />
    ) : (
      <MonthTable
        cellRender={props.monthCellRender}
        contentRender={props.monthCellContentRender}
        locale={locale}
        onSelect={this.onMonthSelect}
        prefixCls={`${prefixCls}-month-panel`}
        value={value}
        disabledDate={disabledDate}
      />
    );

    const children = [
      header,
      (<div key="calendar-body" className={`${prefixCls}-calendar-body`}>
        { table }
      </div>),
    ];


    const className = [`${prefixCls}-full`];

    if (fullscreen) {
      className.push(`${prefixCls}-fullscreen`);
    }

    return this.renderRoot({
      children,
      className: className.join(' '),
    });
  },
});

export default PopoverCalendar;
