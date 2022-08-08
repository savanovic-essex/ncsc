import React from "react";
import {Button, Table} from "reactstrap";

const AuthoritiesTable = () => {
    return (
        <Table hover>
            <thead>
            <tr>
                <th>
                    # ID
                </th>
                <th>
                    Name
                </th>
                <th>
                    Email Address
                </th>
                <th style={{ textAlign: 'right' }}>
                    Action
                </th>
            </tr>
            </thead>
            <tbody>
            <tr valign={"middle"}>
                <th>
                    1
                </th>
                <td>
                    Mark
                </td>
                <td>
                    Otto
                </td>
                <td align={"right"}>
                    <Button size={"sm"} color={"primary"} outline>Open</Button>
                </td>
            </tr>
            <tr valign={"middle"}>
                <th>
                    2
                </th>
                <td>
                    Jacob
                </td>
                <td>
                    Thornton
                </td>
                <td align={"right"}>
                    <Button size={"sm"} color={"primary"} outline>Open</Button>
                </td>
            </tr>
            <tr valign={"middle"}>
                <th>
                    3
                </th>
                <td>
                    Larry
                </td>
                <td>
                    the Bird
                </td>
                <td align={"right"}>
                    <Button size={"sm"} color={"primary"} outline>Open</Button>
                </td>
            </tr>
            </tbody>
        </Table>
    )
}

export default AuthoritiesTable;
