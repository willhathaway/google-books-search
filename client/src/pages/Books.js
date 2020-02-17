import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// class books extends react component, uses components to render main books page:

class Books extends Component {
    state = {
        // local variables:
        books: [],
        q: "",
        message: "search for a book"
      };
      
      // function used in form for rendering user's entered text:
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    
      // function used in form for querying google books API:
      getBooks = () => {
        API.getBooks(this.state.q)
          .then(res =>
            this.setState({
              books: res.data
            })
          )
          .catch(() =>
            this.setState({
              books: [],
              message: "no books by that name found"
            })
          );
      };
    
    
      // function takes event as argument and then calls the getBooks() function:
      handleFormSubmit = event => {
        event.preventDefault();
        this.getBooks();
      };
    
      handleBookSave = id => {
        const book = this.state.books.find(book => book.id === id);
    
        API.saveBook({
          googleId: book.id,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          link: book.volumeInfo.infoLink,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks.thumbnail
        }).then(() => this.getBooks());
      };

      // render function, returns the compliled components:
    render() {
        return (
          <Container>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1 className="text-center">
                    <strong>Google Books Search</strong>
                  </h1>
                </Jumbotron>
              </Col>
              <Col size="md-12">
                <Card title="Book Search" icon="far fa-book">
                  <Form
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    q={this.state.q}
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col size="md-12">
                <Card title="Results">
                  {this.state.books.length ? (
                    <List>
                      {this.state.books.map(book => (
                        <Book
                          key={book.id}
                          title={book.volumeInfo.title}
                          subtitle={book.volumeInfo.subtitle}
                          link={book.volumeInfo.infoLink}
                          authors={book.volumeInfo.authors.join(", ")}
                          description={book.volumeInfo.description}
                          image={book.volumeInfo.imageLinks.thumbnail}
                          Button={() => (
                            <button
                              onClick={() => this.handleBookSave(book.id)}
                            >
                              Save
                            </button>
                          )}
                        />
                      ))}
                    </List>
                  ) : (
                    <h2 className="text-center">{this.state.message}</h2>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        );
      }
    }
    
    export default Books;