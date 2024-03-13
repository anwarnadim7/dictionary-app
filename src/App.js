import React, { useState } from "react";
import Axios from "axios";
import { LuSearch } from "react-icons/lu";
import { HiOutlineSpeakerWave, HiOutlinePause } from "react-icons/hi2";
import Footer from "./Components/Footer";

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const getMeaning = () => {
    setMessage("");
    if (!searchWord.trim()) {
      setMessage("Search word cannot be empty");
      return;
    }
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          setMessage("No data found for the search word");
        }
      })
      .catch((error) => {
        setMessage("Error fetching data: " + error.message);
      });
  };

  const playAudio = () => {
    if (data.phonetics && data.phonetics.length > 0 && data.phonetics[0].audio) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
      };
    } else {
      console.error("No audio available for this word");
    }
  };

  const sentenceCase = (str) => {
    if (!str) {
      return false;
    }
    str = str.toString();
    return str.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }
  return (<>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-white">Dictionary</h1>
      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none flex-grow px-2 py-1"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          className="flex items-center justify-center bg-gray-200 text-gray-800  rounded-lg ml-1 p-2"
          onClick={() => {
            getMeaning();
          }}
        >
          <LuSearch size="20px" />
        </button>
      </div>
      <p className="text-red-600">{message}</p>

      {data && (
        <div className="mt-8 border bg-white border-gray-300 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold mr-4">{sentenceCase(data.word)} ~ {data.phonetic}</h2>
            {data.phonetics && data.phonetics.length > 0 && data.phonetics[0].audio && (
              <button
                className="bg-gray-200 text-gray-800 rounded-lg ml-2 p-1"
                onClick={() => {
                  playAudio();
                }}
              >
                {isPlaying ? <HiOutlinePause size="20px" /> : <HiOutlineSpeakerWave size="20px" />}
              </button>
            )}
          </div>
          <div className="border border-gray-100 rounded-lg p-2 bg-gray-50">
            <div className="mb-4">
              <h4 className="font-semibold text-lg">Parts of Speech:</h4>
              <p className="mt-2 text-gray-700">{data.meanings[0].partOfSpeech}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-lg">Definition:</h4>
              <p className="mt-2 text-gray-700">{data.meanings[0].definitions[0].definition}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Example:</h4>
              <p className="mt-2 text-gray-700">{data.meanings[0].definitions[0].example}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
  </>
  );
}

export default App;
