import React from "react";
import {Button, Table, Toast, ToastBody} from "reactstrap";
import {ref, remove} from "firebase/database";
import {db} from "../firebase";
import {useState} from "react";

const ITUpdatesTable = ({data}) => {
    const [isOpen, setIsOpen] = useState(false);

    const deleteITUpdate = (uidd) => {
        remove(ref(db, `/itupdates/${uidd}`))
            .then(() => {
                setIsOpen(true);
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
            });
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
                {
                    data.map((update, i) => {
                        return (
                            <tr valign={"middle"} key={i}>
                                <th>
                                    {update.uidd}
                                </th>
                                <td>
                                    {update.title}
                                </td>
                                <td>
                                    {update.type}
                                </td>
                                <td>
                                    {update.yearOfPublication}
                                </td>
                                <td>
                                    {update.version}
                                </td>
                                <td>
                                    {update.company}
                                </td>
                                <td>
                                    {update.features}
                                </td>
                                <td align={"right"}>
                                    <Button size={"sm"}
                                            color={"danger"}
                                            onClick={() => deleteITUpdate(update.uidd)}
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
            <Toast isOpen={isOpen} className={"bg-success text-white"}>
                <ToastBody>
                    Successfully deleted an authority.
                </ToastBody>
            </Toast>
        </>
    )
}

export default ITUpdatesTable;
