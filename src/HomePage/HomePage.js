import React from 'react';
import {connect} from 'react-redux';
import Header from '../_components/Header/Header'
import {TextField} from 'material-ui'
import RichBitchContainer from "./Content/RichBitchContainer";
import PaymentButton from "./PaymentButton";
import {pointService} from "../_services/pointService";
import firebase from 'firebase';
import {userActions} from "../_actions/userAction";
import LoadingHandler from '../_components/LoadingHandler'


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadAllUsers();
    }

    loadAllUsers(){
        this.props.dispatch(userActions.getAllUsers());
    }

    handleChange(event) {
        const { name, value } = event.target;
        console.log(value)

        this.setState({
            points: value
        });
    }

    componentWillUpdate(){

    }

    handleSubmit(){
        pointService.addPoints(this.state.points);
    }

    render() {
              return (
            <div>
                <Header title="Home" />
                <RichBitchContainer/>
                <LoadingHandler show={this.props.userList.fetching} />
                <TextField
                    name="points"
                    floatingLabelText="Points"
                    type="number"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>TestPoints</button>

                <PaymentButton/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, userList} = state;
    return {
        user, userList
    }
}

export default connect(mapStateToProps)(HomePage);