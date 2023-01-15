import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
const inter = Inter({ subsets: ['latin'] })
const spotifyApi = new SpotifyWebApi();
const Home = () =>{
  const [book, setbook] = useState('');
  const [songId, setSongId] = useState('');
  const [songData, setSongData] = useState(null);
  function onchangebook(event){
    console.log(event.target.value);
    setbook(event.target.value);
  }
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
  getSongId(output.text);
}

// Replace YOUR_ACCESS_TOKEN with your actual access token


// Replace YOUR_SONG_NAME with the name of the song you want to search for

async function getSongId(songName) {
  //const access_token = process.env.YOUR_ACCESS_TOKEN;
    try {
        // Make the API request to search for the song
        const response = await fetch(`https://v1.nocodeapi.com/manaspatil0967/spotify/UpMrfvcRBxTwIOHU/search?q=${songName}&type=track`);
        const json = await response.json();
        // Extract the song's ID from the API response
        const songId = json.tracks.items[0].id;
        console.log(`The ID of the song is: ${songId}`);
        setSongId(songId);
        return songId;
    } catch (error) {
        console.log(error);
    }
}
  return (
    <>
      <Head>
        <title>Buk Vibr</title>
        <meta name="description" content="Vibe with your fav book" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='root'>
        <div className='header'>
          <div className='header-title'>
            <h1>Buk Vibr!</h1>
          </div>
          <div className='header-subtitle'>
            <h2>Use GPT-3 to get a song for your favorite book!</h2>
          </div>
        </div>
        <div>
          <textarea 
          placeholder='Enter the book name'
          className='prompt-box'
          value={book}
          onChange = {onchangebook}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
              >           
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
        </div>
        <div>
      
      {songId && (
        <iframe
          src={`https://open.spotify.com/embed/track/${songId}`}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      )}
    </div>
      </div>
    </>
  )
}

export default Home;
