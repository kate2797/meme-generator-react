import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg", // default state
  });

  const [allMemes, setAllMemes] = React.useState([]); // default state

  // make API call, once, after the component has rendered for the first time
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => setAllMemes(res.data.memes)); // update state with a memes array
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    // update the state of the meme object, pass callback as we depend on the previous state
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
  }

  return (
    <main>
      <div className='form'>
        <input type='text' placeholder='Top text' className='form--input' />
        <input type='text' placeholder='Bottom text' className='form--input' />
        <button className='form--button' onClick={getMemeImage}>
          Get a new meme image &nbsp;🖼
        </button>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} className='meme--image' alt='Meme' />
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
    </main>
  );
}
