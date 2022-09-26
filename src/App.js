import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useState } from 'react';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
// import useStyles from './style.js'
// import { Typography } from '@mui/material';
const alanKey = 'a876750e4f3c95fc8c557356c9d9508d2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {


    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    // const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                console.log(articles)
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText('please try that again.');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('opening...');
                    }
                }
            }
        })
    }, [])


    return (

        <div >
            <div >
                {/* <img src={'https://img.freepik.com/premium-vector/flat-city-street-landscape-with-skyscraper-apartment-building-town-real-estate-houses-road-cityscape-scene-urban-vector-panorama_102902-4340.jpg?size=626&ext=jpg'} alt="alan logo" /> */}
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>

    )
}

export default App;