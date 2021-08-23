import React, { Component } from 'react';

class Pagination extends Component {
    state = {  }
    render() { 
        return ( 
            <nav>
                <ul className="pagination justify-content-center">
                    {/* conditional rendering for previous  */}
                    {
                        this.props.currentPage == 1 ? (
                            <li className="page-item disabled">
                                <a className="page-link" aria-disabled="true">Previous</a>
                            </li>
                        ) : (
                            <li className="page-item"  onClick={this.props.previousPage}>
                                <a className="page-link">Previous</a>
                            </li>   
                        )
                    }

                        {/* conditional rendering for pagesCount Btns */}
                    {
                        this.props.pages.map((currentPageCount) => {
                            return currentPageCount == this.props.currentPage ? (
                                <li className="page-item active">
                                    <a className="page-link" href="#">{currentPageCount}</a>
                                </li>
                            ) : (
                                <li className="page-item">
                                    <a className="page-link" onClick={() => {this.props.setPage(currentPageCount);}}>{currentPageCount}</a>
                                </li>
                            )
                        })
                    } 

                    {/* conditional rendering for next */}
                    {
                        this.props.currentPage == this.props.pages.length ? (
                            <li className="page-item disabled">
                                <a className="page-link"  aria-disabled="true">Next</a>
                            </li>
                        ) : (
                            <li className="page-item" onClick={this.props.nextPage}>
                                <a className="page-link">Next</a>
                            </li>
                        )
                    }
                </ul>
            </nav>
         );
    }
}
 
export default Pagination;