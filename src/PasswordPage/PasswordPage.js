import React from 'react';
import {userActions} from "../_actions/userAction"
import {TextField, FlatButton} from 'material-ui'
import {connect} from 'react-redux';
import SimpleTextField from "../_components/Elements/SimpleTextField";
import './PasswordPage.css'
import Navigation from "../_components/Navigation";
import Back from 'material-ui/svg-icons/navigation/chevron-left';
import IconButton from 'material-ui/IconButton';
import {history} from "../_helpers/history"
import AnimatedWrapper from '../_helpers/AnimatedWrapper'


class PasswordPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginUser: {
                email: '',
                password: ''
            },
            submitted: false,
            validEmail: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { loginUser } = this.state;
        this.setState({
            loginUser: {
                ...loginUser,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { loginUser } = this.state;
        if (loginUser.email) {
            this.props.dispatch(userActions.userprofileExist(loginUser.email));
            history.push('/password');

        }
    }

    componentDidMount() {
        this.props.dispatch({type: 'LOADER_STOP'});
    }

    handleBack(){
        history.push('/login');
    }


    render() {
        const { loginUser, submitted } = this.state;
        const { user } = this.props;

        const style = {
            float: 'right'
        }


        return(
            <div>

                <form name="password" onSubmit={this.handleSubmit}>
                    <div className={'from-group' + (submitted && !loginUser.email ? ' has-error' : '')}>

                        <SimpleTextField
                            name="email"
                            floatingLabelText="Email"
                            type="email"
                            errorText={ submitted && !loginUser.email && 'Email is required '}
                            onChange={this.handleChange}
                        />
                    </div>

                    {
                        user.userEmailExist  ?

                            <FlatButton
                                onClick={this.handleBack}
                                style={style}
                            >Back to login</FlatButton>
                        :
                            <div className="form-group">
                                <FlatButton
                                    type="submit"
                                    style={style}
                                >Next</FlatButton>
                            </div>
                    }



                </form>

                <Navigation
                    right={
                        <IconButton
                            className="floatingButtonLeft"
                            onClick={this.handleBack}
                            tooltipPosition="bottom-center"
                            tooltip="Back to Login" >
                            <Back/>
                        </IconButton>
                    }
                />

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {registration, user} = state;
    return {
        registration, user
    }
}
export default connect(mapStateToProps)(PasswordPage);
