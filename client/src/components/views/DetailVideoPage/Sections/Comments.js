import React, { useState, useContext } from 'react'
import { Button, Input } from 'antd';
import axios from '../../../../axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { AuthContext } from '../../../../_context/authContext';
import { withRouter } from "react-router-dom";

const { TextArea } = Input;

function Comments(props) {

    const context = useContext(AuthContext);
    // console.log(context);

    const { userData, isAuthenticated } = context.authData;

    const [Comment, setComment] = useState("")
    const handleChange = (e) => {

        // console.log(context);

        setComment(e.currentTarget.value)
    }

    // console.log(Comment);

    const onSubmit = (e) => {
        e.preventDefault();

        const requestBody = `
        mutation{
           createComment(commentInput:{
            content:"${Comment}",
            userId:"${userData.userId}",
            videoId:"${props.videoId}"}){
            id,
            content,
            createdAt
            }
        }`;

        axios.post('/', {
            query: requestBody,
        }).then(response => {
            // console.log(response);
            if (response) {
                setComment("")
                if (response.data.data.createComment)
                    props.refreshFunction(response.data.data.createComment)
            } else {
                alert('Failed to save Comment')
            }
        });
    }

    const handleClick = () => {
        if (!isAuthenticated) {
            props.history.push("/login");
        }
    }

    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                <React.Fragment key={index}>
                    <SingleComment comment={comment}
                        videoId={props.videoId}
                        refreshFunction={props.refreshFunction}
                    />
                    {/* <ReplyComment CommentLists={props.CommentLists}
                        videoId={props.videoId} parentCommentId={comment.id}
                        refreshFunction={props.refreshFunction}
                    /> */}
                </React.Fragment>
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    onClick={handleClick}
                    value={Comment}
                    placeholder="write some comments..."
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default withRouter(Comments)
