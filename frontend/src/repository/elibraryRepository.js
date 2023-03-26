import axios from '../custom-axios/axios'

const ELibraryService = {
    fetchBooks: () => {
        return axios.get("/books");
    },

    fetchBookById: (id) => {
        return axios.get(`/books/${id}`);
    },

    fetchCategories: () => {
        return axios.get("/categories");
    },

    fetchAuthors: () => {
        return axios.get("/authors");
    },

    fetchCountries: () => {
        return axios.get("/countries");
    },


    addBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },

    editBook: (id, name, category, authorId, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },

    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },

    markBookAsTaken: (id) => {
        return axios.put(`/books/markAsTaken/${id}`);
    }
}

export default ELibraryService;