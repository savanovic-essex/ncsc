import React from "react";
import {Button, Table} from "reactstrap";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {ref, remove} from "firebase/database";
import {db} from "../firebase";

const ReportsTable = ({data}) => {
    const navigate = useNavigate();

    const deleteReport = (uidd) => {
        remove(ref(db, `/reports/${uidd}`));
    };

    return (
        <Table hover responsive>
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
                data.map((report, i) => {
                   return (
                        <tr valign={"middle"} key={i}>
                            <th>
                                {report.uidd}
                            </th>
                            <td>
                                {report.title}
                            </td>
                            <td>
                                {moment(report.date).format('MMMM Do YYYY, h:mm:ss A')}
                            </td>
                            <td align={"right"}>
                                <Button size={"sm"}
                                        color={"primary"}
                                        onClick={() => navigate(`/reportview/${report.uidd}`)}
                                        outline>
                                    Open
                                </Button>
                                <Button size={"sm"}
                                        className={"mx-2"}
                                        color={"danger"}
                                        onClick={() => deleteReport(report.uidd)}
                                        outline>
                                    Delete
                                </Button>
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
