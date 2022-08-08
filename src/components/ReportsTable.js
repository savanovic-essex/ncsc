import React from "react";
import {Button, Table} from "reactstrap";

const ReportsTable = ({data}) => {
    return (
        <Table hover>
            <thead>
            <tr>
                <th>
                    # ID
                </th>
                <th>
                    Title
                </th>
                <th>
                    Date of creation
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
                                {report.title}
                            </td>
                            <td>
                                {report.date}
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

export default ReportsTable;
