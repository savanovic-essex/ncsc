import React, {useState} from "react";
import {Button, Table} from "reactstrap";
import EditAuthorityModal from "./EditAuthorityModal";
import {db} from "../firebase";
import {ref, remove} from "firebase/database";

const AuthoritiesTable = ({data}) => {
    const [modal, setModal] = useState(false);
    const [uidd, setUidd] = useState('');

    const toggle = (uidd) => {
        if (modal) {
            setUidd('')
        }
        setUidd(uidd);
        setModal(!modal);
    };

    const deleteAuthority = (uidd) => {
        remove(ref(db, `/authorities/${uidd}`));
    };

    return (
        <>
            <Table hover responsive>
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
                    data.map((authority, i) => {
                        return (
                            <tr valign={"middle"} key={i}>
                                <th>
                                    {authority.uidd}
                                </th>
                                <td>
                                    {authority.name}
                                </td>
                                <td>
                                    {authority.email}
                                </td>
                                <td align={"right"}>
                                    <Button size={"sm"}
                                            className={"mx-2"}
                                            color={"primary"}
                                            onClick={() => toggle(authority.uidd)}
                                            outline>
                                        Edit
                                    </Button>
                                    <Button size={"sm"}
                                            color={"danger"}
                                            onClick={() => deleteAuthority(authority.uidd)}
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
            {
             uidd && <EditAuthorityModal modal={modal} toggle={toggle} uidd={uidd}/>
            }
        </>
    )
}

export default AuthoritiesTable;
