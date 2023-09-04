import React, { useRef, useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import Stomp from 'stompjs';

export default function Index() {
  const localIdInp = useRef('');
  const remoteIdInp = useRef('');
  const localVideo = useRef();
  const remoteVideo = useRef();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [remainder, setRemainder] = useState('');
  const [callInitiated, setCallInitiated] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  let remoteStream;
  let remoteID;
  let localID;
  let stompClient;
  const [isConnected, setIsConnected] = useState(false);

  //   let subscriptions = [];

  //   for getting the ip address of reciver and sender  we are using gogle free STUN server

  const iceServers = {
    iceServer: {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
      iceCandidatePoolSize: 2,
    },
  };

  const localPeer = new RTCPeerConnection(iceServers);

  useEffect(() => {
    if (videoEnabled || audioEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: videoEnabled, audio: audioEnabled })
        // Used for video and audio permissions
        .then((stream) => {
          setLocalStream(stream);
          localVideo.current.srcObject = stream;
          // setting local video stream on local video div
        })
        .catch((error) => {
          console.error('Error accessing media:', error);
        });
    } else if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      localVideo.current.srcObject = null;
    }
  }, [videoEnabled, audioEnabled]);

  function handleConnect() {
    // Connect to Websocket Server

    if (!isConnected) {
      // Perform your connect logic here
      // After the connect logic is done, set isConnected to true
      setIsConnected(true);
    }

    const socket = new WebSocket(
      'wss://web-rtc-server-techbrutal1151-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/websocket'
    );

    //   var socket = new WebSocket('ws://localhost:8080/websocket');

    stompClient = Stomp.over(socket);

    localID = localIdInp.current.value;

    console.log('My ID: ', localID);

    console.log('Step - 1');

    stompClient.connect(
      {},
      (frame) => {
        console.log(frame);

        // Subscribe to call requests
        // console.log('/user/'+ localIdInp.current.value+ '/topic/call-request');
        stompClient.subscribe(`/user/${localIdInp.current.value}/topic/call-request`, (callRequest) => {
          const caller = JSON.parse(callRequest.body);

          //   const acceptCall = window.confirm(`Incoming call from ${caller}. Accept?`);

          const acceptCall = true;

          if (acceptCall) {
            stompClient.send('/app/call', {}, JSON.stringify({ callTo: localIdInp.current.value, callFrom: caller }));
          }
        });

        stompClient.subscribe(`/user/${localIdInp.current.value}/topic/call`, (call) => {
          console.log('Step - 2');

          console.log('Call From: ', call.body);

          console.log('Step - 3');

          remoteID = call.body;

          remoteIdInp.current.value = remoteID;

          console.log('Remote ID: ', call.body);

          //   Setting remote video stream to remote video div

          localPeer.ontrack = (event) => {
            try {
              if (event && event.streams && event.streams[0]) {
                console.log(event.streams[0]);

                remoteVideo.current.srcObject = event.streams[0];
              } else {
                console.error('Invalid event or stream data received.');

                setErrorMessage('Invalid event or stream data received');
              }
            } catch (error) {
              console.error('Error setting remote video stream:', error);

              setErrorMessage('Error setting remote video stream:');
            }
          };

          localPeer.onicecandidate = (event) => {
            console.log('Step - 4');

            try {
              if (event.candidate) {
                const candidateValue = {
                  type: 'candidate',

                  lable: event.candidate.sdpMLineIndex,

                  id: event.candidate.candidate,
                };

                console.log('Sending Candidate');

                console.log(candidateValue);

                setTimeout(() => {
                  stompClient.send(
                    '/app/candidate',
                    {},
                    JSON.stringify({
                      toUser: call.body,

                      fromUser: localID,

                      candidate: candidateValue,
                    })
                  );
                }, 500);
              }
            } catch (error) {
              console.error('Error sending candidate:', error);

              setErrorMessage('Error sending candidate');
            }
          };

          // Adding Audio and Video Local Peer

          localStream.getTracks().forEach((track) => {
            console.log('Step - 5: Adding track to localPeer');

            try {
              localPeer.addTrack(track, localStream);

              console.log('Track added successfully');
            } catch (error) {
              console.error('Error adding track to localPeer:', error);
            }
          });

          // Creating And Sending Offer

          localPeer
            .createOffer()
            .then((description) => {
              console.log('Step - 6');

              localPeer
                .setLocalDescription(description)
                .then(() => {
                  console.log('Setting Description', description);

                  stompClient.send(
                    '/app/offer',
                    {},
                    JSON.stringify({
                      toUser: call.body,

                      fromUser: localID,

                      offer: description,
                    })
                  );
                })
                .catch((error) => {
                  console.error('Error setting local description:', error);

                  setErrorMessage('Error setting description');
                });
            })
            .catch((error) => {
              console.error('Error creating offer:', error);

              setErrorMessage('Error creating offer');
            });
        });

        // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // //////////////////////////////////////////////////////////////////////////////////////////////////////

        // Receiving offers

        stompClient.subscribe(`/user/${localIdInp.current.value}/topic/offer`, async (offer) => {
          try {
            console.log('Step - 7');

            console.log('Offer came');

            const o = JSON.parse(offer.body).offer;

            console.log(offer.body);

            console.log(new RTCSessionDescription(o));

            console.log(typeof new RTCSessionDescription(o));

            console.log(o);

            localPeer.setRemoteDescription(new RTCSessionDescription(o));
          } catch (error) {
            console.error('Error Handling the Offer', error);

            setErrorMessage('Error Handling the Offer');
          }

          localPeer.ontrack = (event) => {
            console.log('Step - 8');

            console.log(event.streams[0]);

            console.log(event.track.kind);

            // if (event.track.kind === 'video') {

            // Set the remote stream only when a video track is received

            remoteVideo.current.srcObject = event.streams[0];

            // }
          };

          // Adding Audio and Video Local Peer

          localStream.getTracks().forEach((track) => {
            localPeer.addTrack(track, localStream);
          });

          //   Creating and Sending Answer

          try {
            localPeer.createAnswer().then((description) => {
              localPeer.setLocalDescription(description);

              console.log('Setting Local Description');

              console.log(description);

              stompClient.send(
                '/app/answer',
                {},
                JSON.stringify({
                  toUser: remoteID,

                  fromUser: localID,

                  answer: description,
                })
              );
            });
          } catch (error) {
            console.error('An error occurred while sending description');

            setErrorMessage('An error occurred while sending description');
          }

          //   Sending Candidates to the ice server

          localPeer.onicecandidate = (event) => {
            if (event.candidate) {
              const candidateValue = {
                type: 'candidate',

                lable: event.candidate.sdpMLineIndex,

                id: event.candidate.candidate,
              };

              console.log('Sending Candidate');

              console.log(candidateValue);

              try {
                setTimeout(() => {
                  stompClient.send(
                    '/app/candidate',
                    {},
                    JSON.stringify({
                      toUser: remoteID,
                      fromUser: localID,
                      candidate: candidateValue,
                    })
                  );
                }, 500);
              } catch (error) {
                console.error('Error sending Candidate');

                setErrorMessage('Error sending Candidate');
              }
            }
          };
        });

        // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // //////////////////////////////////////////////////////////////////////////////////////////////////////

        // Receiving Answers

        stompClient.subscribe(`/user/${localIdInp.current.value}/topic/answer`, async (answer) => {
          console.log('Answer Came');

          try {
            const object = JSON.parse(answer.body).answer;

            console.log(object);

            console.log('Setting remote description');

            localPeer.setRemoteDescription(new RTCSessionDescription(object));
          } catch (answerError) {
            console.error('Error processing answer:', answerError);
          }
        });

        // //////////////////////////////////////////////////////////////////////////////////////////////////////

        // //////////////////////////////////////////////////////////////////////////////////////////////////////

        // //////////////////////////////////////////////////////////////////////////////////////////////////////

        // Receiving the candidate information

        stompClient.subscribe(`/user/${localIdInp.current.value}/topic/candidate`, (candidate) => {
          console.log('Candidate Came');

          console.log('Inside /Candidate');

          const o = JSON.parse(candidate.body).candidate;

          console.log(o);

          console.log(o.lable);

          console.log(o.id);

          // Create a new RTCIceCandidate using the information from the server

          console.log('Setting up a new RTCIceCandidate');

          const iceCandidate = new RTCIceCandidate({
            sdpMLineIndex: o.lable,

            candidate: o.id,
          });

          console.log('Adding iceCandidate');

          setCallInitiated(true);

          // Add the ice candidate to the peer connection

          localPeer.addIceCandidate(iceCandidate);
        });

        // Receiving the remainder information

        stompClient.subscribe('/topic/reminder', (message) => {
          console.log('Reminder:', JSON.parse(message.body).message);

          window.alert('Reminder: ', JSON.parse(message.body).message);

          setRemainder(JSON.parse(message.body).message);
        });

        console.log('Step - 3');

        stompClient.send('/app/addUser', {}, localIdInp.current.value);

        // Frame Ends here
      },

      (error) => {
        console.error('Error connecting to WebSocket server:', error);

        window.alert('Error connecting to WebSocket server');
      }
    );
  }

  function endCallAutomatically() {
    console.log('Call ended automatically.');

    handleLeave();
  }

  function showReminder() {
    console.log('1 minutes remaining!');

    // Send a reminder message to the WebSocket server

    if (stompClient) {
      const reminderMessage = {
        type: 'reminder',

        message: '1 minutes remaining!',
      };

      stompClient.send('/app/sendMessage', {}, JSON.stringify(reminderMessage));
    }
  }

  function handleCall() {
    if (stompClient) {
      remoteID = remoteIdInp.current.value;

      stompClient.send(
        '/app/call-request',
        {},
        JSON.stringify({ callTo: remoteIdInp.current.value, callFrom: localIdInp.current.value })
      );

      //   stompClient.send("/app/call", {}, JSON.stringify({"callTo": remoteIdInp.current.value, "callFrom": localIdInp.current.value}))

      setTimeout(showReminder, 2 * 60 * 1000);

      setTimeout(endCallAutomatically, 3 * 60 * 1000);
    } else {
      setErrorMessage('Stomp is not available');

      window.alert('User Already Busy in Another Call');
    }
  }

  function handleLeave() {
    clearTimeout(showReminder);

    clearTimeout(endCallAutomatically);

    if (stompClient) {
      stompClient.send('/app/leave', {}, localID);

      hideVideos();
      // Disconnect the WebSocket connection

      stompClient.disconnect(() => {
        console.log('STOMP client disconnected');
      });

      window.location.href = '/app';
    } else {
      window.location.href = '/app';
    }
  }

  const toggleVideo = async () => {
    const videoTrack = localStream.getTracks().find((track) => track.kind === 'video');

    if (videoTrack.enabled) {
      videoTrack.enabled = false;

      document.getElementById('camera-btn').style.backgroundColor = 'red';
    } else {
      videoTrack.enabled = true;

      document.getElementById('camera-btn').style.backgroundColor = 'rgb(179,102,249,.9)';
    }
  };

  const toggleAudio = async () => {
    const audioTrack = localStream.getTracks().find((track) => track.kind === 'audio');

    if (audioTrack.enabled) {
      audioTrack.enabled = false;

      document.getElementById('mic-btn').style.backgroundColor = 'red';
    } else {
      audioTrack.enabled = true;

      document.getElementById('mic-btn').style.backgroundColor = 'rgb(179,102,249,.9)';
    }
  };

  function hideVideos() {
    localVideo.current.srcObject = null;

    remoteVideo.current.srcObject = null;

    if (localStream) {
      console.log(localStream);

      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  function disconnectFromStomp() {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log('STOMP client disconnected');
      });
    }
  }

  // Attach the event listener to the window

  useEffect(() => {
    window.addEventListener('beforeunload', disconnectFromStomp);

    return () => {
      window.removeEventListener('beforeunload', disconnectFromStomp);
    };
  }, []);


  return (
    <div>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1668632150893-6bfccb01bdc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RhcnRzJTIwYXQlMjBuaWdodHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")',
        }}
      >
        <h1 className="text-center text-light">Hi WebRTC-Project From Anup.</h1>

        <div className="d-flex justify-content-center mt-5">
          <video
            id="localVideo"
            ref={localVideo}
            autoPlay
            muted
            className="m-2 bg-black"
            style={{ height: '500px', width: '500px' }}
          />

          <video
            id="remoteVideo"
            ref={remoteVideo}
            autoPlay
            muted
            className="m-2 bg-black"
            style={{ height: '500px', width: '500px' }}
          />
        </div>
        <div className="d-flex justify-content-center border-radius-50">
          <div
            id="camera-btn"
            onClick={toggleVideo}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                toggleVideo();
              }
            }}
            tabIndex="0"
            role="button"
            style={{
              borderRadius: '50%',
              padding: '20px',
              backgroundColor: 'rgb(179,102,249,.9)',
              cursor: 'pointer',
            }}
            className="d-flex justify-content-center align-items-center m-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
              className="bi bi-camera-video-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
              />
            </svg>
          </div>

          <div
            id="mic-btn"
            onClick={toggleAudio}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                toggleAudio();
              }
            }}
            tabIndex="0" // Make the element focusable
            role="button" // Indicate that this element behaves like a button
            style={{
              borderRadius: '50%',
              padding: '20px',
              backgroundColor: 'rgb(179,102,249,.9)',
              cursor: 'pointer',
            }}
            className="d-flex justify-content-center align-items-center m-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
              className="bi bi-mic-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
            </svg>{' '}
          </div>

          <div
            id="leave-btn"
            onClick={handleLeave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLeave();
              }
            }}
            tabIndex="0" // This makes the element focusable
            role="button" // Indicate that this element behaves like a button
            style={{
              borderRadius: '50%',
              padding: '20px',
              backgroundColor: 'red',
              cursor: 'pointer',
            }}
            className="d-flex justify-content-center align-items-center m-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
              className="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>{' '}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <input
            type="text"
            name="localId"
            id="localId"
            ref={localIdInp}
            placeholder="Enter Your ID"
            className="h-50 border-dark"
          />

          <button id="connectBtn" onClick={handleConnect} className="btn btn-primary m-3" disabled={isConnected}>
            {isConnected ? 'Connected' : 'Connect'}
          </button>
        </div>

        <div>
          <input
            type="text"
            name="remoteId"
            id="remoteId"
            ref={remoteIdInp}
            placeholder="Enter Remote ID"
            className="h-50 border-dark"
          />

          <button id="callBtn" onClick={handleCall} className="btn btn-success m-3">
            Call
          </button>
        </div>
      </div>
    </div>
  );
}
