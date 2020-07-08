import React, { useEffect, useState } from 'react'
import axios from '../../../../axios';
function SideVideo(props) {

    const [SideVideos, setSideVideos] = useState([])

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
            // console.log(response);
            if (response.data) {
                // console.log(response.data)

                let sidevideos = response.data.data.getVideos;

                sidevideos = sidevideos.filter(video => video.id !== props.videoId);

                setSideVideos(sidevideos)
            } else {
                alert('Failed to get Videos')
            }
        });
    }, [])

    const sideVideoItem = SideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }} key={index}>
            <div style={{ width: '40%', marginRight: '1rem' }}>
                <a href={`/video/${video.id}`} style={{ color: 'gray' }}>
                    <img style={{ width: '100%' }} src={`http://localhost:4000/${video.thumbnail}`} alt="thumbnail" />
                </a>
            </div>

            <div style={{ width: '50%' }}>
                <a href={`/video/${video.id}`} style={{ color: 'gray' }}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                    <span>{video.writer.firstname + " " + video.writer.lastname}</span><br />
                    <span>{video.views}</span><br />
                    <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    })

    return (
        <React.Fragment>
            <div style={{ marginTop: '3rem' }}></div>
            {sideVideoItem}
        </React.Fragment>
    )
}

export default SideVideo
