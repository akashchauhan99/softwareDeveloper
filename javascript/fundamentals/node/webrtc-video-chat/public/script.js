const socket = io('/')
const chatInputBox = document.getElementById('chat_message')
const all_messages = document.getElementById('all_messages')
const main_chat_window = document.getElementById('main_chat_window')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true

//PEERJS CONNECTION CONFIG
let peer = new Peer({
   config: {
      iceServers: [
         {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
         },
         {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
         },
         {
            url: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
         },
         {
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
         },
         {
            url: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
         },
         {
            url: ['turn:13.250.13.83:3478?transport=udp'],
            credential: 'YzYNCouZM1mhqhmseWK6',
            username: 'YzYNCouZM1mhqhmseWK6'
         }
      ]
   }
})

let myVideoStream
let currentUserId
let pendingMsg = 0
let peers = {}

let getUserMedia =
   navigator.getUserMedia ||
   navigator.webkitGetUserMedia ||
   navigator.mozGetUserMedia

navigator.mediaDevices
   .getUserMedia({
      video: true,
      audio: true
   })
   .then((stream) => {
      myVideoStream = stream
      addVideoStream(myVideo, stream, 'me')

      peer.on('call', (call) => {
         call.answer(stream)
         const video = document.createElement('video')

         call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream)
            console.log(peers)
         })
      })

      socket.on('user-connected', (userId) => {
         connectToNewUser(userId, stream)
      })

      socket.on('user-disconnected', (userId) => {
         if (peers[userId]) peers[userId].close()
         speakText(`User ${userId} Leaved.`)
      })

      document.addEventListener('keydown', (e) => {
         if (e.which === 13 && chatInputBox.value != '') {
            socket.emit('message', {
               msg: chatInputBox.value,
               user: currentUserId
            })
            chatInputBox.value = ''
         }
      })

      document.getElementById('sendMsg').addEventListener('click', (e) => {
         if (chatInputBox.value != '') {
            socket.emit('message', {
               msg: chatInputBox.value,
               user: currentUserId
            })
            chatInputBox.value = ''
         }
      })

      chatInputBox.addEventListener('focus', () => {
         document.getElementById('chat_Btn').classList.remove('has_now')
         pendingMsg = 0
         document.getElementById('chat_Btn').children[1].innerHTML = `Chat`
      })

      socket.on('createMessage', (message) => {
         console.log(message)
         let li = document.createElement('li')
         if (message.user != currentUserId) {
            li.classList.add('OtherUser')
            li.innerHTML = `<div><b>User (<small>${message.user}</small>): </b> ${message.msg}</div>`
         } else {
            li.innerHTML = `<div><b>Me: </b>${message.msg}</div>`
         }

         all_messages.append(li)
         main_chat_window.scrollTop = main_chat_window.scrollHeight
      })
   })

peer.on('call', function (call) {
   getUserMedia(
      {
         video: true,
         audio: true
      },
      function (stream) {
         call.answer(stream)
         const video = document.createElement('video')
         call.on('stream', function (remoteStream) {
            addVideoStream(video, remoteStream)
         })
      },
      function (err) {
         console.log('Failed to get local stream', err)
      }
   )
})

peer.on('open', (id) => {
   currentUserId = id
   socket.emit('join-room', ROOM_ID, id)
})

socket.on('disconnect', function () {
   socket.emit('leave-room', ROOM_ID, currentUserId)
})

//CHAT

const connectToNewUser = (userId, stream) => {
   let call = peer.call(userId, stream)
   console.log(call)
   let video = document.createElement('video')

   call.on('stream', (userVideoStream) => {
      console.log(userVideoStream)
      addVideoStream(video, userVideoStream, userId)
   })

   call.on('close', () => {
      video.remove()
   })
   peers[userId] = call
}

const playStop = () => {
   let enabled = myVideoStream.getVideoTracks()[0].enabled
   if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false
      setPlayVideo()
   } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true
   }
}

const muteUnmute = () => {
   const enabled = myVideoStream.getAudioTracks()[0].enabled
   if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false
      setUnmuteButton()
   } else {
      setMuteButton()
      myVideoStream.getAudioTracks()[0].enabled = true
   }
}

const addVideoStream = (videoE1, stream, uId = '') => {
   videoE1.srcObject = stream
   videoE1.id = uId
   videoE1.addEventListener('loadedmetadata', () => {
      videoE1.play()
   })

   videoGrid.append(videoE1)
   let totalUsers = document.getElementsByTagName('video').length
   if (totalUsers > 1) {
      for (let index = 0; index < totalUsers; index++) {
         document.getElementsByTagName('video')[index].style.width =
            100 / totalUsers + '%'
      }
   }
}

const ShowChat = (e) => {
   e.classList.toggle('active')
   document.body.classList.toggle('showChat')
}

const showInvitePopup = () => {
   document.body.classList.add('showInvite')
   document.getElementById('roomLink').value = window.location.href
}

const hideInvitePopup = () => {
   document.body.classList.remove('showInvite')
}

const copyToClipboard = () => {
   let copyText = document.getElementById('roomLink')

   copyText.select()
   copyText.setSelectionRange(0, 99999)

   document.execCommand('copy')

   alert('Copied: ' + copyText.value)

   hideInvitePopup()
}

const playChatSound = () => {
   const chatAudio = document.getElementById('chatAudio')
   chatAudio.play()
}

const speakText = (msgText) => {
   let msg = new SpeechSynthesisUtterance()
   msg.text = msgText
   window.speechSynthesis.speak(msg)
}

const setUnmuteButton = () => {
   const html = `<i class="unmute fa fa-microphone-slash"></i>
    <span class="unmute">Unmute</span>`
   document.getElementById('muteButton').innerHTML = html
}

const setMuteButton = () => {
   const html = `<i class="fa fa-microphone"></i>
    <span>Mute</span>`
   document.getElementById('muteButton').innerHTML = html
}
const setPlayVideo = () => {
   const html = `<i class="unmute fa fa-pause-circle"></i>
    <span class="unmute">Resume Video</span>`
   document.getElementById('playPauseVideo').innerHTML = html
}

const setStopVideo = () => {
   const html = `<i class=" fa fa-video-camera"></i>
    <span class="">Pause Video</span>`
   document.getElementById('playPauseVideo').innerHTML = html
}
