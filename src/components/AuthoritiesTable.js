import React from "react";
import {Button, Table} from "reactstrap";

const AuthoritiesTable = ({data}) => {
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
            {
                data.map((report) => {
                    return (
                        <tr valign={"middle"}>
                            <th>
                                {report.uidd}
                            </th>
                            <td>
                                {report.name}
                            </td>
                            <td>
                                {report.email}
                            </td>
                            <td align={"right"}>
                                <Button size={"sm"} color={"primary"} outline>Open</Button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}

export default AuthoritiesTable;
