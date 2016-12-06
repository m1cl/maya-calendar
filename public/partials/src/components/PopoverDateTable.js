import React from 'react';
import DateTHead from 'rc-calendar/lib/date/DateTHead';
import DateTBody from 'rc-calendar/lib/date/DateTBody';
import Popover from 'react-popover';

export default
class PopoverDateTable extends React.Component {
getInitialState () {
    return {
      isOpen: false,
    };
  }
  toggle () {
    this.setState({ isOpen: !this.state.isOpen })
  }
  renderPopover () {
    const {
        isOpen,
    } = this.state
    return (
      <Popover isOpen={isOpen} body='Boo!'>
        <div
          className={ classNames('target', { isOpen }) }
          onClick={this.toggle}>
          { this.renderPerson(isOpen) }
        </div>
      </Popover>
    )
}
  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    return (
        <table className = {`${prefixCls}-table`} cellSpacing="0" role="grid" onClick={this.renderPopover}>
            <DateTHead {...props}/>
            <DateTBody {...props}/>
        </table>
    );
  }
}
