import { Link } from 'react-router-dom'
import React, { Fragment } from 'react'



class Header extends React.Component {

  state = {
    categoryIdx: 0,
    showModalPopup: false

  }

  isShowPopup = (status) => {
    this.setState({ showModalPopup: status });
  };

  render() {

    return (
      <header className="header">
        <h1 className="header-title">Mappy Notes</h1>

        <nav>
          <ul className="navList">
            <li>
              <Link className="navLink1" to="/">Home</Link>
            </li>
            <li>
              <Link 
              className="navLink1" to="/cities">By Cities</Link>
            </li>
            <li>
                <Link
                className="navLink1" to="/pins">Make a Pin</Link>
            </li>
          </ul>
        </nav>

      </header>
    );
  }
}

export default Header;
