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
import Paper from 'material-ui/Paper'
import firebase from 'firebase'


class PrestigeTable extends Component {


    render() {
        let users = this.props.userList.users;
        const rows = users.map((val, index)=> {
            let style = '';
            if(val.email === firebase.auth().currentUser.email){
                style = {color: '#CC8F1B'}
            }
            let styleIndex = {width: '10px'}
            return (
                <TableRow key={val.email} selectable={false}>
                    <TableRowColumn style={styleIndex}>{index + 1}</TableRowColumn>
                    <TableRowColumn style={style}>{val.username}</TableRowColumn>
                    <TableRowColumn  style={style} className='rightColumn' >{val.totalPoints}</TableRowColumn>
                </TableRow>
            );
        })
        return (
            <Paper style={{maxHeight: 250, overflow: 'auto'}}>

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
            </Paper>
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
