import React,{useEffect,useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import axios from 'axios'

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
import logo from './assets/logo.png'

const alanKey = 'd50a9dcb5877fde568e71d92617d108f2e956eca572e1d8b807a3e2338fdd0dc/stage';

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
                        axios.get(articles).then((res)=>{
                            window.open(res.data.articles[number+1].url, '_blank');
                        })
                    }else if(command === 'goBack'){
                        window.location.reload();
                    }
                }
        })
    },[])

  return (
    <div>
        <div className={classes.logoContainer} >
        <a style={{marginTop: '50px'}} href="/"> <img src={logo} className={classes.alanLogo} alt="logo"/></a>
        </div>
        <NewsCards articles={newsArticles}/>
    </div>
  )
}

export default App