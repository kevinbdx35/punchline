import React from 'react';

export const Started = (props) => {
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
              <a href="/getstarted">get started</a>
            </li>
            <li>
              <a href="/theteam">the team</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className='main'>
        started
      </div>

    </div>
  );
};
