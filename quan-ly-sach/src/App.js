import React, { useState } from 'react';
import { Formik } from 'formik';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({});
  const [indexSelected, setIndexSelected] = useState(-1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleValidate = (values) => {
    let errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (!values.number) {
      errors.number = 'Required';
    }

    return errors;
  };

  const handleSelect = (book, index) => {
    setForm(book);
    setIndexSelected(index);
  };

  const handleDelete = (index) => {
    const newBooks = JSON.parse(JSON.stringify(books));
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };

  const handleSubmit = () => {
    const newBooks = JSON.parse(JSON.stringify(books));

    if (indexSelected > -1) {
      newBooks.splice(indexSelected, 1, form);
    } else {
      newBooks.push(form);
    }

    setBooks(newBooks);
    setForm({});
    setIndexSelected(-1);
  };

  return (
    <div className="App">
      <h1>Book Manager</h1>

      <Formik initialValues={form} validate={handleValidate} onSubmit={handleSubmit}>
        {({ values, handleSubmit,errors }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title || ''}
                onChange={handleChange}
              />
              {errors.title && <div className="error">{errors.title}</div>}
            </div>
            <div>
              <label htmlFor="number">Number:</label>
              <input
                type="text"
                id="number"
                name="number"
                value={values.number || ''}
                onChange={handleChange}
              />
              {errors.number && <div className="error">{errors.number}</div>}
            </div>
            <button type="submit">Save</button>
          </form>
        )}
      </Formik>

      <h2>Book List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <div>Title: {book.title}</div>
            <div>Number: {book.number}</div>
            <button onClick={() => handleSelect(book, index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;