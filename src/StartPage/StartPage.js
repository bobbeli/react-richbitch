import React from 'react';
import {connect} from 'react-redux';
import Logo from '../_components/Elements/Logo'
import {Link} from 'react-router-dom'

class StartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({type: 'LOADER_STOP'});
    }


    render() {
        const h2Style = {
            textAlign:'center'
        }
        const divStyle = {
            textAlign:'center',
            fontSize: '20px',

        }

        return (
            <div>
                <Logo/>
                <div className="App-card-container">
                    <h2 style={h2Style}>Money is nothing until it is Prestige</h2>
                    <div style={divStyle}>
                        <Link to='/login'>Login</Link><br/><br />
                        <Link to='/register'>Register</Link>
                    </div>
                </div>
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

export default connect(mapStateToProps)(StartPage);