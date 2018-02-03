import React, {Component}  from 'react'
import {connect} from 'react-redux'


class PrestigeScore extends Component {

    render() {

        const style = {
            width: '100%',
            height: '200px',
            color: 'white',
            fontSize: '3.4em',
            textAlign: 'center'
        }

        return (
          <div>
              <h1>Highscore</h1>
              <h3>You're currently ranked on</h3>
              <span style={style}>
                  {this.props.user.rank}
              </span>

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

export default connect(mapStateToProps)(PrestigeScore);