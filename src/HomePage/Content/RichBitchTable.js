import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableFooter,
    TableBody,
    TableRowColumn
} from 'material-ui/Table';


class RichBitchTable extends Component {

    renderRow() {
        let {userList} = this.props;

        /*
        if(userList.fetched === true){
            if (typeof userList !== 'undefined') {

                let users = userList.users;
                if (typeof users !== 'undefined') {
                    if(users !== null){
                       Object.keys(users).map((key, index) => {
                            console.log('username', users[key].firstname);
                            console.log('lastname', users[key].lastname);
                            console.log('email', users[key].email);
                            console.log('points', users[key].points);

                        });
                    }
                }
            }
        }
        */

        if(userList.fetched === true) {
            if (typeof userList !== 'undefined') {
                Object.entries(userList.users).map((users, index) => {
                    Object.entries(users).map((user, index) => {
                            return ([
                                <TableRow key="2">">
                                    <TableHeaderColumn>{user[index].firstname}</TableHeaderColumn>
                                    <TableHeaderColumn>{user[index].email}</TableHeaderColumn>
                                </TableRow>
                            ]);


                    })

                })
            }
        }
    }

    render() {
        let users = this.props.userList.users;
        const rows = users.map((val)=> {
            return (
                <TableRow>
                    <TableRowColumn>{val.firstname}</TableRowColumn>
                    <TableRowColumn>{val.email}</TableRowColumn>
                    <TableRowColumn>{val.totalPoints}</TableRowColumn>

                </TableRow>
            );
        })
        return (
            <Table>
                <TableHeader
                    displayRowCheckbox={false}
                >

                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {rows}
                </TableBody>
            </Table>
        );
    }
}


function mapStateToProps(state) {
    const {user, userList} = state;
    return {
        user, userList
    }
}

export default connect(mapStateToProps)(RichBitchTable);
