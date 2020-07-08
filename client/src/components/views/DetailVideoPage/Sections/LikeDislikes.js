import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import axios from '../../../../axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    // console.log(props);

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {

        // console.log(variable);

        if (variable.videoId || variable.commentId) {

            const requestBody = `{
            getLikes(likeInput:{
                userId:"${variable.userId}",
                videoId:"${variable.videoId}",
                commentId:"${variable.commentId}"
            }){
                userId
        }}`;

        axios.post('/', {
            query: requestBody,
        }).then(response => {
                // console.log('getLikes', response)
                if (response.data) {
                    //How many likes does this video or comment have 
                    setLikes(response.data.data.getLikes.length)
                    //if I already click this like button or not 
                    response.data.data.getLikes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes');
                }
            })

            // Axios.post('/api/like/getDislikes', variable);
            //     .then(response => {
            //         console.log('getDislike', response.data)
            //         if (response.data.success) {
            //             //How many likes does this video or comment have 
            //             setDislikes(response.data.dislikes.length)

            //             //if I already click this like button or not 
            //             response.data.dislikes.map(dislike => {
            //                 if (dislike.userId === props.userId) {
            //                     setDislikeAction('disliked')
            //                 }
            //             })
            //         } else {
            //             alert('Failed to get dislikes')
            //         }
            //     })
        }
    }, [variable]);


    const onLike = () => {

        if (LikeAction === null) {
            const requestBody = `
            mutation{
               upLike(likeInput:{videoId:"${variable.videoId}",userId:"${variable.userId}",commentId:"${variable.commentId}"}){
                id
                }
            }`;

            axios.post('/', {
                query: requestBody,
            }).then(response => {
                // console.log(response);
                if (response.data.data) {
                    setLikes(Likes + 1);
                    setLikeAction('liked');
                    //If dislike button is already clicked
                    if (DislikeAction !== null) {
                        setDislikeAction(null);
                        setDislikes(Dislikes - 1);
                    }
                } else {
                    alert('Failed to increase the like')
                }
            });
        } else {
            const requestBody = `
            mutation{
               unLike(likeInput:{videoId:"${variable.videoId}",userId:"${variable.userId}",commentId:"${variable.commentId}"})
            }`;

            axios.post('/', {
                query: requestBody,
            }).then(response => {
                // console.log(response);
                if (response.data.data) {
                    setLikes(Likes - 1)
                    setLikeAction(null)
                } else {
                    alert('Failed to decrease the like')
                }
            })
        }
    }


    const onDisLike = () => {

        if (DislikeAction !== null) {

            const requestBody = `
            mutation{
               unDisLike(likeInput:{videoId:"${variable.videoId}",userId:"${variable.userId}",commentId:"${variable.commentId}"})
            }`;

            axios.post('/', {
                query: requestBody,
            }).then(response => {
                // console.log(response);
                if (response.data) {
                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)
                } else {
                    alert('Failed to decrease dislike')
                }
            });
        } else {
            const requestBody = `
            mutation{
               upDisLike(likeInput:{videoId:"${variable.videoId}",userId:"${variable.userId}",commentId:"${variable.commentId}"}){
                id
                }
            }`;
            axios.post('/', {
                query: requestBody,
            }).then(response => {
                // console.log(response);
                if (response.data) {
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')
                    //If dislike button is already clicked
                    if (LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                } else {
                    alert('Failed to increase dislike')
                }
            })
        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes
