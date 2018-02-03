import React, {Component}  from 'react'
import {connect} from 'react-redux'

import './PrestigeScore.css'


class PrestigeScore extends Component {

    render() {
        let users = this.props.userList;
        return (
          <div>
              <h1 className="headingOne">Highscore</h1>
              <h5 className="headingThree">You're currently ranked on</h5>

              <div className="user-rank">
                    <span className="user-rank-score">{this.props.user.rank} </span>
                    <span className="user-rank-out-of">out of  {users.users.length} </span>
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

export default connect(mapStateToProps)(PrestigeScore);