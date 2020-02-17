  
import axios from "axios";

export default {
  // gets books
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // gets saved books
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  // deletes saved book
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // saves a book
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};