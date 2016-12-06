import React from 'react';
import TextField from 'material-ui/TextField';

const styles = {
  propContainer: {
      // float: 'left',
    width: '90%',
    margin:'20px auto 10px',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};
export default class TextFieldComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <div style={styles.propContainer}>
            <TextField
              hintText="Event Name"
              errorText="This field is required"
              fullWidth={true}
            /><br />
            <TextField
              hintText="Event Description"
              errorText="The error text can be as long as you want, it will wrap."
              multiLine={true}
              fullWidth={true}
              rows={12}
            /><br />
          </div>
        );
    }
};

