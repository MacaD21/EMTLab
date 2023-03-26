import React from 'react';
import './App.css';
import {Component} from 'react';
import ELibraryService from '../../repository/elibraryRepository';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from '../Books/BookEdit/bookEdit';
import Books from '../Books/BookList/books';
import Categories from '../Categories/categories'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: [],
            categories: [],
            countries: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <main>
                    <Header/>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/categories"}
                                   element={<Categories categories={this.state.categories}/>} exact/>
                            <Route path={"/books/add"}
                                   element={<BookAdd categories={this.state.categories}
                                                     authors={this.state.authors}
                                                     onAddBook={this.addBook}/>} exact/>
                            <Route path={"/books/edit/:id"}
                                   element={<BookEdit categories={this.state.categories}
                                                      authors={this.state.authors}
                                                      onEditBook={this.editBook}
                                                      book={this.state.selectedBook}
                                   />} exact/>
                            <Route path={"/books"}
                                   element={<Books books={this.state.books}
                                                   onDelete={this.deleteBook}
                                                   onEdit={this.fetchBookById}
                                                   onMarkAsTaken={this.markBookAsTaken}
                                   />}
                                   exact/>
                            <Route path="/" element={<Navigate replace to="/books"/>}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }

    loadBooks = () => {
        ELibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    fetchBookById = (bookId) => {
        ELibraryService.fetchBookById(bookId)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    addBook = (name, category, authorId, availableCopies) => {
        ELibraryService.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    editBook = (id, name, category, authorId, availableCopies) => {
        ELibraryService.editBook(id, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    deleteBook = (id) => {
        ELibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    markBookAsTaken = (id) => {
        ELibraryService.markBookAsTaken(id)
            .then(() => {
                this.loadBooks();
            });
    }

    loadCategories = () => {
        ELibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    loadAuthors = () => {
        ELibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    loadCountries = () => {
        ELibraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            })
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
        this.loadCountries();
    }
}

export default App;