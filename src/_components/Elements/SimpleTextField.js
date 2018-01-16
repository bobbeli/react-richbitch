import React from 'react';
import TextField from 'material-ui/TextField'
import {Styles} from '../../_assets/Styles'


class SimpleTextField extends React.Component {
    render() {
        return (
            <div>
                <TextField
                    className="removeAutoFill"
                    name={this.props.name}
                    floatingLabelText={this.props.floatingLabelText}
                    type={this.props.type}
                    style={Styles.textField}
                    inputStyle={Styles.inputStyle}
                    floatingLabelStyle={Styles.floatingLabelStyle}
                    floatingLabelShrinkStyle={Styles.floatingLabelShrinkStyle}
                    onChange={this.props.onChange}
                    errorText={this.props.errorText}
                />
            </div>
        );
    }
}

export default SimpleTextField;