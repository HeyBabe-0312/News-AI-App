import React,{useEffect,useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import {Typography} from '@material-ui/core'
import axios from 'axios'

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
import logo from './assets/logo.png'

const alanKey = 'c2b091f5034f572494c52a246a6eb7a02e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const classes = useStyles();
    const [newsArticles, setNewsArticles] = useState([]);
    useEffect(()=>{
        alanBtn({
                key: alanKey,
                onCommand: ({ command, articles, number }) => {
                    if(command === 'newHeadlines'){
                         axios.get(articles).then((res)=>{
                            setNewsArticles(res.data.articles);
                        })
                    }else if(command === 'open'){
                        openArticle(articles,number);
                    }else if(command === 'goBack'){
                        window.location.reload();
                    }
                }
        })
    },[])
  const openArticle = (link,num) => {
    axios.get(link).then((res)=>{
        window.open(res.data.articles[Number(num)-1].url, '_blank');
    }) 
  }
  return (
    <div>
        <div className={classes.logoContainer} >
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <a style={{marginTop: '50px'}} href="/"> <img src={logo} className={classes.alanLogo} alt="logo"/></a>
        </div>
        <NewsCards articles={newsArticles}/>
    </div>
  )
}

export default App