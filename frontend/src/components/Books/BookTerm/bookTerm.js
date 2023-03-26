import React from "react";
import {Link} from "react-router-dom";

const BookTerm = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.author.name} {props.term.author.surname}</td>
            <td scope={"col"}>{props.term.author.country.name}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>
            <td scope={"col"} className={"text-right"}>
                <Link className={"btn btn-info mx-2"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                <a title={"Mark As Taken"} className={"btn btn-success"}
                   onClick={() => props.onMarkAsTaken(props.term.id)}>
                    Mark As Taken
                </a>
                <a
                    title={"Delete"}
                    className={"btn btn-danger"}
                    onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
            </td>
        </tr>
    );
}

export default BookTerm;