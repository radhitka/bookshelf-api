import { nanoid } from 'nanoid';
import books from '../models/book_model.js';
import { allBooksResources } from '../resources/book_resources.js';
import {
  responseBadRequest,
  responseCreated,
  responseJustMessage,
  responseNotFound,
  responseSuccess,
} from '../response/response.js';
import { isNull, validateIsBiggerThan } from '../validation/index.js';

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

  if (isNull(name)) {
    return responseBadRequest(h, {
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (validateIsBiggerThan(readPage, pageCount)) {
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

const updateBook = (req, h) => {
  const { bookId } = req.params;

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

  const updatedAt = new Date().toISOString();

  const finished = pageCount == readPage;

  if (isNull(name)) {
    return responseBadRequest(h, {
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (validateIsBiggerThan(readPage, pageCount)) {
    return responseBadRequest(h, {
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const bookIndex = books.findIndex((book) => book.id == bookId);

  if (bookIndex === -1) {
    return responseNotFound(h, {
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
    finished,
  };

  return responseJustMessage(h, {
    message: 'Buku berhasil diperbarui',
  });
};

export { findBook, getAllBooks, postBook, updateBook };
