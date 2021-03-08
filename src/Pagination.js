import React from 'react';
import "./Pagination.css"

const Pagination = ({ paginate, curPage }) => {
  return (
    <div className="center">
        <div className="pagination">
            <a onClick={() => paginate(1)}className={(curPage === 1 ? 'active ' : '')}>1</a>
            <a onClick={() => paginate(2)}className={(curPage === 2 ? 'active ' : '')}>2</a>
            <a onClick={() => paginate(3)}className={(curPage === 3 ? 'active ' : '')}>3</a>
            <a onClick={() => paginate(4)}className={(curPage === 4 ? 'active ' : '')}>4</a>
            <a onClick={() => paginate(5)}className={(curPage === 5 ? 'active ' : '')}>5</a>
            <a onClick={() => paginate(6)}className={(curPage === 6 ? 'active ' : '')}>6</a>
            <a onClick={() => paginate(7)}className={(curPage === 7 ? 'active ' : '')}>7</a>
            <a onClick={() => paginate(8)}className={(curPage === 8 ? 'active ' : '')}>8</a>
            <a onClick={() => paginate(9)}className={(curPage === 9 ? 'active ' : '')}>9</a>
            <a onClick={() => paginate(10)}className={(curPage === 10 ? 'active ' : '')}>10</a>
        </div>
    </div>
  );
};

export default Pagination;