import React from "react";
import {Button, Table} from "reactstrap";

const ITUpdatesTable = () => {
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
                    Type
                </th>
                <th>
                    Year of Publication
                </th>
                <th>
                    Version
                </th>
                <th>
                    Company
                </th>
                <th>
                    Features of Product
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
                <td>
                    Otto
                </td>
                <td>
                    Otto
                </td>
                <td>
                    Otto
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
                <td>
                    Thornton
                </td>
                <td>
                    Thornton
                </td>
                <td>
                    Thornton
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
                <td>
                    the Bird
                </td>
                <td>
                    the Bird
                </td>
                <td>
                    the Bird
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

export default ITUpdatesTable;
