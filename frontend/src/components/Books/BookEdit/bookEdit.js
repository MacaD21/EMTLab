import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const BookEdit = (props) => {
    const navigate = useNavigate();

    const [formData, updateFormData] = useState({
        name: props.book.name || '',
        category: props.book.category || '',
        author: (props.book.author && props.book.author.id) || 1,
        availableCopies: props.book.availableCopies || 0,
    });

    useEffect(() => {
        if (!props.book) return;

        updateFormData({
            name: props.book.name || '',
            category: props.book.category || '',
            author: (props.book.author && props.book.author.id) || 1,
            availableCopies: props.book.availableCopies || 1,
        });
    }, [props.book]);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const {name, category, author, availableCopies} = formData;

        props.onEditBook(props.book.id, name, category, author, availableCopies);
        navigate('/books');
    };

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder={props.book.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={handleChange}
                        >
                            {props.categories.map((term) => {
                                if (
                                    props.book.category !== undefined &&
                                    props.book.category === term
                                ) {
                                    return (
                                        <option
                                            key={term.id}
                                            selected={props.book.category}
                                            value={props.book.category}
                                        >
                                            {term}
                                        </option>
                                    );
                                } else {
                                    return (
                                        <option key={term.id} value={term}>
                                            {term}
                                        </option>
                                    );
                                }
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select
                            name="author"
                            className="form-control"
                            onChange={handleChange}
                        >
                            {props.authors.map((term) => {
                                if (
                                    props.book.author !== undefined &&
                                    props.book.author.id === term.id
                                ) {
                                    return (
                                        <option
                                            key={term.id}
                                            selected={props.book.author.id}
                                            value={props.book.author.id}
                                        >
                                            {term.name + ' ' + term.surname}
                                        </option>
                                    );
                                } else {
                                    return (
                                        <option key={term.id} value={term.id}>
                                            {term.name + ' ' + term.surname}
                                        </option>
                                    );
                                }
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input
                            type="text"
                            className="form-control"
                            id="availableCopies"
                            name="availableCopies"
                            placeholder={props.book.availableCopies}
                            onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookEdit;