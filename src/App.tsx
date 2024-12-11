import { useState, useEffect } from 'react';
import { Logo } from './icons/logo';
import Navbar from './components/Navbar';

function App() {
    interface Meme {
        topText: string;
        bottomText: string;
        imageUrl: string;
    }

    const [meme, setMeme] = useState<Meme>({
        topText: 'One does not simply',
        bottomText: 'Walk into Mordor',
        imageUrl: 'http://i.imgflip.com/1bij.jpg',
    });

    const [allMemes, setAllMemes] = useState<Meme[]>([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then((res) => res.json())
            .then((data) => setAllMemes(data.data.memes));
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[randomNumber].url; // Corrected property to match API response
        setMeme((prevMeme) => ({
            ...prevMeme,
            imageUrl: newMemeUrl,
        }));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.currentTarget;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    }

    return (
        <>
            <Navbar icon={<Logo />} title="Meme Generator" />

            <div className="min-h-screen bg-zinc-900 flex items-start justify-center pt-10">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-bold">
                            Top Text
                            <input
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="One does not simply"
                                name="topText"
                                onChange={handleChange}
                                value={meme.topText}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-bold">
                            Bottom Text
                            <input
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Walk into Mordor"
                                name="bottomText"
                                onChange={handleChange}
                                value={meme.bottomText}
                            />
                        </label>
                    </div>

                    <button
                        onClick={getMemeImage}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Get a new meme image 🖼
                    </button>

                    <div className="mt-6 relative">
                        <img
                            src={meme.imageUrl}
                            alt="Meme"
                            className="w-full rounded-lg border border-gray-300"
                        />
                        <span className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">
                            {meme.topText}
                        </span>
                        <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">
                            {meme.bottomText}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
