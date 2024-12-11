import { useState, useEffect } from 'react';

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
        const newMemeUrl = allMemes[randomNumber].imageUrl;
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
            <div>
                <div className="form">
                    <label>
                        Top Text
                        <input
                            className="bg-slate-300"
                            type="text"
                            placeholder="One does not simply"
                            name="topText"
                            onChange={handleChange}
                            value={meme.topText}
                        />
                    </label>

                    <label>
                        Bottom Text
                        <input
                            className="bg-slate-300"
                            type="text"
                            placeholder="Walk into Mordor"
                            name="bottomText"
                            onChange={handleChange}
                            value={meme.bottomText}
                        />
                    </label>

                    <button
                        onClick={getMemeImage}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Get a new meme image 🖼
                    </button>
                </div>
                <div className="meme">
                    <img src={meme.imageUrl} />
                    <span className="top">{meme.topText}</span>
                    <span className="bottom">{meme.bottomText}</span>
                </div>
            </div>
        </>
    );
}

export default App;
