import React, { useEffect, useState, useContext } from 'react'
import { Card, Col, Typography, Row } from 'antd';
import axios from '../../../axios';
import moment from 'moment';
import { ThemeContext } from '../../../_context/themeContext';
import { Link } from 'react-router-dom'
import { makeStyles, CardActionArea, CardMedia, CardContent, Box, Avatar } from '@material-ui/core';
const { Title } = Typography;
 

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        // padding:5
        
    },
});
function LandingPage() {


    const [Videos, setVideos] = useState([])

    const context = useContext(ThemeContext);
    const { isLightTheme, light, dark } = context;
    const theme = isLightTheme ? light : dark;
    const classes = useStyles();

    useEffect(() => {
        const requestBody = `{
        getVideos{
            id
            title
            description
            filePath
            category
            views
            privacy
            duration
            thumbnail
            createdAt
            updatedAt
            userId
            writer{
                firstname
                lastname
                image
                }
            }
        }`;

        axios.post('/', {
            query: requestBody,
        }).then(response => {
            console.log(response);
            if (response.data.data.getVideos) {
                console.log(response.data)
                setVideos(response.data.data.getVideos)
            } else {
                alert('Failed to get Videos')
            }
        }).catch(err => {
            console.log('//////////////', err);
        })
    }, [])

    console.log(Videos);

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return (
            <Col lg={6} md={8} xs={24}>
                <Card className='video_card' >
                    <CardActionArea>
                        <Link to={`/video/${video.id}`} >
                            <CardMedia
                                style={{ position: 'relative' }}
                                component="img"
                                alt="thumbnail"
                                height="130"
                                image={`http://localhost:4000/${video.thumbnail}`}
                                title={video.title}
                            />
                        </Link>
                        <span style={{
                            position: 'absolute',
                            top: '100px',
                            right: '10px',
                            padding: '0 5px',
                            color: '#aaa', backgroundColor: '#fff'
                        }}
                        >{minutes} : {seconds}</span>
                        <CardContent>
                            <Typography style={{ display: 'flex', justifyContent: 'start' }}>
                                <Avatar className={classes.orange}>
                                    {video.writer.firstname.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box style={{ alignSelf: 'center', marginLeft: '10px' }}>
                                    {video.title}
                                </Box>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <Box style={{ marginLeft: '50px' }} >{video.writer.firstname + " " + video.writer.lastname} </Box>
                                <Box>
                                    {/* <span style={{ marginLeft: '3rem' }}>
                                        {video.views ? video.views : 0} views</span> -  */}
                                        <span> {moment(video.createdAt).format("MMM Do YY")}
                                    </span>
                                </Box>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                {/* <div style={{ position: 'relative' }}>
                    <Link to={`/video/${video.id}`} >
                        <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:4000/${video.thumbnail}`} />
                        <div className=" duration"
                            style={{
                                bottom: 0, right: 0, position: 'absolute', margin: '4px',
                                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                                padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
                                fontWeight: '500', lineHeight: '12px'
                            }}>
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </Link>
                </div>
                <br />
                <Meta avatar={<Avatar src={video.writer.image} />} title={video.title} style={{ backgroundColor: '#fff', color: "#fff" }} />
                <span>{video.writer.firstname + "" + video.writer.lastname} </span><br />
                <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span> */}


            </Col>


        )
    });

    return (
        <div style={{
            width: '85%', margin: '3rem auto',
            // backgroundColor: theme.backgroundColor,
            color: theme.color
        }}>
            <Title level={2} > Recommended </Title>
            <hr />
            <Row gutter={16}>{renderCards}</Row>
        </div>
    )
}

export default LandingPage
