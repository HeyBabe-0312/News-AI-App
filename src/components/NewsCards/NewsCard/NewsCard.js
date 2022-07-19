import React,{useState} from 'react'
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core'

import classNames from 'classnames';
import useStyles from './styles'

const NewsCard = ({article:{ description, publishedAt, source, title, url, urlToImage},i}) => {
    const classes = useStyles();
    const [actived,setActived] = useState(false);

  return (
    <Card className={classNames(classes.card, actived ? classes.activeCard : null)} onMouseOver={()=>setActived(true)} onMouseOut={()=>setActived(false)}>
        <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={title} />
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                <Typography variant="body2" color="textSecondary" component='h2'>{source.name}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component='p'>{description}</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">Learn More</Button>
            <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
        </CardActions>
    </Card>
  )
}

export default NewsCard