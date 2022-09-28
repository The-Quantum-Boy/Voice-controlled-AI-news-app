import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useState } from 'react';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './style.js'
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import img from './how-to-build-a-news-app-removebg-preview.png'
// import { Typography } from '@mui/material';
import './index.css'
const alanKey = 'a876750e4f3c95fc8c557356c9d9508d2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {


    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    // const [name,setName]=useState('');
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                console.log(articles)
                console.log(number);
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    if (articles.length === 0) {
                        setIsOpen(false)
                        // setName(articles[0].source.name);
                    } else {
                        setIsOpen(true);
                    }
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    // const URL = articles[number].url
                    // console.log(URL);
                    // window.open(URL, '_blank');
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText('please try that again.');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('opening.');
                    }
                }
            }
        })
    }, [])


    return (

        <div >
            <Grid container >
                {!isOpen ?
                    <Grid container item xs={12} alignItems='center' justifyContent="center" >
                        <img src={img} alt="alan logo" className={classes.alanLogo} />
                    </Grid>
                    : <Container><Typography fontFamily='sans-serif' style={{color:'white'}} variant='h2' align='center'> Todays News </Typography><br /></Container>
                }


                <Grid item xs={12}>
                    <NewsCards articles={newsArticles} activeArticle={activeArticle} />
                </Grid>

            </Grid>


        </div>

    )
}

export default App;