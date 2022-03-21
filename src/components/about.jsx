import React from 'react';

export const About = (props) => {
  return (
    <div>
      <header>
        <h1>Punchline</h1>

        <nav className="dropdownmenu">
          <ul>
            <li>
              <a href="/">home</a>
            </li>
            <li>
              <a href="/about">about</a>
            </li>
            <li>
              <a href="">get started</a>
            </li>
            <li>
              <a href="">the team</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className='main'>
        about
      </div>

    </div>
  );
};
