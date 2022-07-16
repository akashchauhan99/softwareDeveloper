const publicVapidKey = process.env.publicVapidKey

//check for service worker
if ('serviceWorker' in navigator) {
   send().catch(err => console.log(err))
}

async function send() {
   // register serviceWorker
   console.log('Register')
   const register = await navigator.serviceWorker.register('/worker.js', {
      scope: '/'
   })
   console.log('service worker')

   // registering push 
   // console.log('Registering push')
   // const sw = await navigator.serviceWorker.ready
   // const subscription = sw.pushManager.subscribe({
   //    userVisibleOnly: true,
   //    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
   // })
   const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
   })
   console.log(subscription.endpoint)

   console.log('Registered push', subscription)

   // send push Notification 
   console.log('sending push')
   await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
         'content-type': 'application/json'
      }
   })
   console.log('Push sent')
}

function urlBase64ToUint8Array(base64String) {
   const padding = '='.repeat(4 - base64String.length % 4) % 4
   const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

   const rawData = window.atob(base64)
   const outputArray = new Uint8Array(rawData.length)
   for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
   }
   return outputArray
}