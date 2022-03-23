import React from 'react';

// fetch('https://api.kanye.rest').then((res) => {
//     console.log(res)

//     res.json()
// }).then((content) => {
//   console.log(content)
// })

export const Home = (props) => {
  const [number, setNumber] = React.useState(0);
  const [post, setPost] = React.useState({ data: [] });

  React.useEffect(() => {
    random();
  }, []);

  const random = () => {
    fetch('http://localhost:3000/quotes')
      .then((res) => {
        return res.json();
      })
      .then((content) => {
        // return this.setState({ post: content });
        setPost(content);
        setNumber(getRandomInt(content.data.length));
      })
      .catch((err) => console.log(err));

    function getRandomInt(max) {
      const id = Math.floor(Math.random() * max);
      return id;
    }
  };

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

      <div className="main">
        <div className="main_content">
          <h2>Punchline</h2>

          <p>
            The first api that allow you to call all you’r favorites punchline
          </p>
          <div className="random_div">
            <button className="random_btn" onClick={random}>
              Random
            </button>
            <div className="random_punch">
              <div className="rdm_punch_quote">{post?.data[number]?.quote}</div>
              <div className="rdm_punch_author">
                -{post?.data[number]?.author}
              </div>
            </div>
            {/* [Math.random(0 & post.lenght)] */}
          </div>
        </div>
      </div>
    </div>
  );
};
