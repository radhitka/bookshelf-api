import { nanoid } from 'nanoid';
import books from '../models/book_model.js';
import { responseSuccess } from '../response/response.js';

const getAllBooks = (req, h) => {
  return responseSuccess(h, {
    message: 'Sukses list Books',
    data: books,
  });
};

const postBook = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const finished = pageCount == readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return responseSuccess(h, {
    message: 'Sukses list Books',
    data: books,
  });
};

export { getAllBooks, postBook };
