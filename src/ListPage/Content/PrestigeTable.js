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
import firebase from 'firebase'


class PrestigeTable extends Component {


    render() {
        let users = this.props.userList.users;
        const rows = users.map((val)=> {
            let style = '';
            if(val.email === firebase.auth().currentUser.email){
                style = {color: '#CC8F1B'}
            }
            return (
                <TableRow key={val.email} selectable={false}>
                    <TableRowColumn style={style}>{val.username}</TableRowColumn>
                    <TableRowColumn  style={style} className='rightColumn' >{val.totalPoints}</TableRowColumn>
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

export default connect(mapStateToProps)(PrestigeTable);
