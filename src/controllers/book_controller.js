import { nanoid } from 'nanoid';
import books from '../models/book_model.js';
import { allBooksResources } from '../resources/book_resources.js';
import {
  responseBadRequest,
  responseCreated,
  responseNotFound,
  responseSuccess,
} from '../response/response.js';

const getAllBooks = (req, h) => {
  return responseSuccess(h, {
    data: {
      books: allBooksResources(books),
    },
  });
};

const findBook = (req, h) => {
  const { bookId } = req.params;

  const book = books.filter((book) => book.id == bookId)[0];

  if (book === undefined) {
    return responseNotFound(h, {
      message: 'Buku tidak ditemukan',
    });
  }

  return responseSuccess(h, {
    data: {
      book: book,
    },
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

  if (name == null || name == '') {
    return responseBadRequest(h, {
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return responseBadRequest(h, {
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id == id).length > 0;

  if (isSuccess == false) {
    return responseBadRequest(h, {
      message: 'Gagal menambahkan buku',
    });
  }

  return responseCreated(h, {
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
};

export { findBook, getAllBooks, postBook };
