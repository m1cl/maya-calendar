import React from 'react';
import DatePicker from './DatePicker';
import TextField from './TextFieldComponent';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  cancel: {
    padding: 10,
    width: '90%',
  },
  button: {
	margin:12,
  },
  toggle: {
      margin:'50%',
      marginTop:10,
    },
}

export default class ToggleableEventButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		isOpen: false,
    };
  }
	handleToggle = () => {
		this.setState({
			isOpen: true,
		});
	}
	handleCancel = () => {
		this.setState({
			isOpen: false,
		});
	}
    render() {
        if(this.state.isOpen){
            return(
              <div style={styles.cancel}>
                <DatePicker />
                <Paper style={styles.toggleEvent} >
                    <TextField />
					<RaisedButton 
						label="Create"
						secondary={false}
						style={styles.button}
					/>
					<RaisedButton 
						onClick={this.handleCancel}
						label="Cancel"
						secondary={true}
						style={styles.button}
					/>
                 </Paper>
				</div>
              );
		} else {
			return(
                <div style={styles.toggle}> 
					<FloatingActionButton 
						onClick={this.handleToggle}
					>
						<ContentAdd />
					</FloatingActionButton>
				</div>
			  );
		  }
	}
}
