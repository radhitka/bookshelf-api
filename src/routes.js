import {
  findBook,
  getAllBooks,
  postBook,
  updateBook,
} from './controllers/book_controller.js';

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: findBook,
  },
  {
    method: 'POST',
    path: '/books',
    handler: postBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
];

export default routes;
