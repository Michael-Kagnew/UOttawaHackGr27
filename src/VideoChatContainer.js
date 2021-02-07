import React from 'react'
import {TranslationRecognizer, SpeechTranslationConfig, AudioConfig} from 'microsoft-cognitiveservices-speech-sdk'
import './App.css'
import { createOffer, initiateConnection, startCall, sendAnswer, addCandidate, initiateLocalStream, listenToConnectionEvents } from './modules/RTCModule'
import firebase from 'firebase/app'
import 'firebase/database'
import config from './config'
import { doOffer, doAnswer, doLogin, doCandidate } from './modules/FirebaseModule'
import 'webrtc-adapter'
import VideoChat from './VideoChat'

var sdk = require("microsoft-cognitiveservices-speech-sdk");

var audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
var translationConfig = sdk.SpeechTranslationConfig.fromSubscription("a72f52f6a88948ecb97668c8596b90e6", "canadacentral");
translationConfig.speechRecognitionLanguage = "en-US";
translationConfig.addTargetLanguage("de");

var recognizer = new sdk.TranslationRecognizer(translationConfig, audioConfig);

recognizer.recognized = function (s, e) {
  console.log("Hello");
  var str = "\r\n(recognized)  Reason: " + sdk.ResultReason[e.result.reason] + " Text: " + e.result.text + " Translations:";

  var language = "de";
  str += " [" + language + "] " + e.result.translations.get(language);
  str += "\r\n";

  console.log(str);
};

      // start the recognizer and wait for a result.
      recognizer.startContinuousRecognitionAsync(
        function (result) {
          recognizer.close();
          recognizer = undefined;
        },
        function (err) {
          recognizer.close();
          recognizer = undefined;
        });

class VideoChatContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      database: null,
      connectedUser: null,
      localStream: null,
      localConnection: null
    }
    this.localVideoRef = React.createRef()
    this.remoteVideoRef = React.createRef()
  }

    componentDidMount = async () => {
      firebase.initializeApp(config);
      // getting local video stream
      const localStream = await initiateLocalStream()
      this.localVideoRef.srcObject = localStream

      const localConnection = await initiateConnection()

      this.setState({
        database: firebase.database(),
        localStream,
        localConnection
      })
    }

    shouldComponentUpdate (nextProps, nextState) {
      if (this.state.database !== nextState.database) {
        return false
      }
      if (this.state.localStream !== nextState.localStream) {
        return false
      }
      if (this.state.localConnection !== nextState.localConnection) {
        return false
      }

      return true
    }

    startCall = async (username, userToCall) => {

      const { localConnection, database, localStream } = this.state
      listenToConnectionEvents(localConnection, username, userToCall, database, this.remoteVideoRef, doCandidate)
      // create an offer
      createOffer(localConnection, localStream, userToCall, doOffer, database, username)
    }

    onLogin = async (username) => {
      return await doLogin(username, this.state.database, this.handleUpdate)
    }

    setLocalVideoRef = ref => {
      this.localVideoRef = ref;
    }

    setRemoteVideoRef = ref => {
      this.remoteVideoRef = ref
    }

    handleUpdate = (notif, username) => {
      const { localConnection, database, localStream } = this.state

      if (notif) {
        switch (notif.type) {
          case 'offer':
            this.setState({
              connectedUser: notif.from
            })

            listenToConnectionEvents(localConnection, username, notif.from, database, this.remoteVideoRef, doCandidate)

            sendAnswer(localConnection, localStream, notif, doAnswer, database, username)
            break
          case 'answer':

            this.setState({
              connectedUser: notif.from
            })
            startCall(localConnection, notif)
            break
          case 'candidate':
            addCandidate(localConnection, notif)
            break
          default:
            break
        }
      }
    }

    render () {
      return <VideoChat
        startCall={this.startCall}
        onLogin={this.onLogin}
        setLocalVideoRef={this.setLocalVideoRef}
        setRemoteVideoRef={this.setRemoteVideoRef}
        connectedUser={this.state.connectedUser}
      />
    }
}

export default VideoChatContainer
