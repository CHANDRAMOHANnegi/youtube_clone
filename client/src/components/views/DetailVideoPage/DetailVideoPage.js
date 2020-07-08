import React, { useEffect, useState, useContext } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from '../../../axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import { AuthContext } from '../../../_context/authContext';

function DetailVideoPage(props) {
    // console.log("-------------DetailVideoPage------------");

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const context = useContext(AuthContext);

    // console.log(videoId, context);

    useEffect(() => {
        // console.log("-------------DetailVideoPage  useEffect------------", videoId);
        if (!videoId) return;

        const requestBody = `{
            getVideo(videoId:"${videoId}"){
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
                        id
                    }
                    Comments{
                            id
                            content 
                            createdAt
                            writer{
                                firstname
                                lastname
                                image
                                id
                            }
                        }
        }}`;

        axios.post('/', {
            query: requestBody,
        }).then(res => {
            // console.log(res);
            if (res.data.data.getVideo) {
                setVideo(res.data.data.getVideo);
                setCommentLists(res.data.data.getVideo.Comments)
            } else {
                setVideo(null);
                setCommentLists(null);
            }
        }).catch(err => {
            console.log(err)
            alert('Failed to get video Info')
        });
    }, [videoId])

    const updateComment = (newComment) => {

        // console.log(CommentLists);
        // console.log(context);

        const { firstname, lastname, image, userId } = context.authData.userData;
        // console.log({ firstname, lastname, image });

        let newCommentLists = CommentLists.filter(comment => comment.writer.id !== userId);

        // console.log(newCommentLists);

        newComment['writer'] = { firstname, lastname, image,id: userId };

        // console.log(newComment);

        setCommentLists([...newCommentLists, newComment]);
    };

    if (Video && Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video
                            style={{ width: '100%' }}
                            src={`http://localhost:4000/${Video.filePath}`} controls>
                        </video>
                        <List.Item
                            actions={[
                                <LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />,
                                <Subscriber userId={Video.userId} subscriberId={localStorage.getItem('userId')} />]}>
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>
                        <Comments CommentLists={CommentLists} videoId={videoId}
                            refreshFunction={updateComment} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo videoId={videoId} />
                </Col>
            </Row>
        )
    }
    else if (!Video) { return <div>Video not found</div> }
    else {
        return (
            <div>Loading...</div>
        )
    }


}

export default DetailVideoPage

