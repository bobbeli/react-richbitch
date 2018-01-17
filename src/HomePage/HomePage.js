import React from 'react';
import {connect} from 'react-redux';
import RichBitchContainer from "./Content/RichBitchContainer";
import PaymentButton from "./PaymentButton";
import {userActions} from "../_actions/userAction";
import {pointActions} from "../_actions/pointAction";
import SimpleTextField from "../_components/Elements/SimpleTextField";
import MenuButton from "./MenuButton";
import FooterNavigation from "../_components/Navigation";


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
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
        this.props.dispatch(pointActions.addPoint(this.state.points));


    }

    render() {
              return (
            <div>
                <RichBitchContainer/>
                <SimpleTextField
                    name="points"
                    floatingLabelText="Points"
                    type="number"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>TestPoints</button>


                <FooterNavigation left={<PaymentButton/>} right={<MenuButton/>} />


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