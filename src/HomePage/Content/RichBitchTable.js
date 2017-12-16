import React, {Component} from 'react';
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
        /*
          if (typeof this.props.inventoryList !== 'undefined') {
            return this.props.inventoryList.map((i) =>
                <TableRow key={i.id}>
                    <TableRowColumn>{i.title}</TableRowColumn>
                    <TableRowColumn>{i.price}</TableRowColumn>
                </TableRow>
            );
        }*/
    }

    render() {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>User</TableHeaderColumn>
                        <TableHeaderColumn>RichBitchPoints</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.renderRow()}
                </TableBody>
            </Table>
        );
    }


}


export default RichBitchTable;
