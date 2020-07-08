import React, { useEffect, useState } from 'react'
import axios from '../../../../axios';
function Subscriber(props) {

    const userId = props.userId
    const subscriberId = props.subscriberId

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = () => {

        console.log(props);

        if (Subscribed) {
            //when we are already subscribed 
            const requestBody = `
            mutation{
                unSubscribe(subscribeInput:{userId:"${userId}",subscriberId:"${subscriberId}"})
            }`;

            axios.post('/', {
                query: requestBody,
            }).then(response => {
                console.log(response);
                if (response.data.data.unSubscribe) {
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert('Failed to unsubscribe');
                }
            })
        } else {
            // when we are not subscribed yet
            const requestBody = `
            mutation{
               subscribe(subscribeInput:{userId:"${userId}",subscriberId:"${subscriberId}"})
            }`;

            axios.post('/', {
                query: requestBody,
            }).then(response => {
                console.log(response);
                if (response.data.data.subscribe) {
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                } else {
                    alert('Failed to subscribe');
                }
            });
        }
    }


    useEffect(() => {
        // console.log("--------------------");

        const requestBody = `{
            subscribeNumber(subscribeInput:{userId:"${userId}",subscriberId:"${subscriberId}"})
        }`;

        axios.post('/', {
            query: requestBody,
        }).then(response => {
            if (response.data) {
                // console.log(response);
                setSubscribeNumber(response.data.data.subscribeNumber)
            } else {
                alert('Failed to get subscriber Number')
            }
        });
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

        const requestBody1 = `
        mutation{
            subscribed(subscribeInput:{userId:"${userId}",subscriberId:"${subscriberId}"})
        }`;

        axios.post('/', {
            query: requestBody1,
        }).then(response => {
            if (response.data) {
                // console.log(response);
                setSubscribed(response.data.data.subscribed)
            } else {
                alert('Failed to get Subscribed Information')
            }
        })

    }, [subscriberId, userId])


    return (
        <div>
            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscriber

