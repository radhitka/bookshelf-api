import { getAllBooks, postBook } from './controllers/book_controller.js';

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: postBook,
  },
];

export default routes;
