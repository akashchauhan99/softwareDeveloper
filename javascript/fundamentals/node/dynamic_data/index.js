let realData = ''
let quotesData = ''

const quotes = document.getElementById('quotes')
const author = document.getElementById('author')
// const tweet = document.getElementById('tweet')

const getNewQuotes = () => {
   let rquote = Math.floor(Math.random() * 164)
   // console.log(rquote)
   // console.log(realData[rquote].text)
   // console.log(realData[rquote].author)
   quotesData = realData[rquote]
   quotes.innerHTML = `${quotesData.text}`
   if (quotesData.author == null) {
      author.innerHTML = 'Unknown'
   } else {
      author.innerHTML = `${realData[rquote].author}`
   }
}

const getQuotes = async () => {
   const api = 'https://type.fit/api/quotes'
   try {
      let data = await fetch(api)
      realData = await data.json()
      getNewQuotes()
      // console.log(realData[0].text)
      // console.log(realData[0].author)
   } catch (error) {}
}

const tweet = () => {
   const tweetPost = `https://twitter.com/intent/tweet?text=${quotesData.text} ${quotesData.author}`
   window.open(tweetPost)
}

// tweet.addEventListener('click', tweet)
