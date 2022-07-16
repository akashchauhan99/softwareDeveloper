Best Practices in NodeJs:

1. Use layered approach

-->>Controller layer 🎮
This is the module of your code where the API routes are defined.
Here you define only, and only your API routes. In the route handler functions, you can deconstruct the request object, pick the important data pieces and pass them to the service layer for processing.

-->>Service layer
This is where your business logic lives, even the secret sauce of your application.
It contains a bunch of classes and methods that take up singular responsibility and are reusable (and also follow other S.O.L.I.D programming principles). This layer allows you to effectively decouple the processing logic from where the routes are defined.  
One more aspect to consider here is the database part. To independently deal with this, we need one more layer.

-->>Data Access Layer
The Data Access layer can take up the responsibility of talking to the database - fetching from, writing to, and updating it.
All your SQL queries, database connections, models, ORM (object-relational mappers), etc. are supposed to be defined here.

2. Folder Structure

src
├── app.js app entry point
├── /api controller layer: api routes
├── /config config settings, env variables
├── /services service layer: business logic
├── /models data access layer: database models
├── /scripts miscellaneous NPM scripts
├── /subscribers async event handlers
└── /test test suites

As a developer, nothing brings me more pleasure than reading (and writing) cleanly structured and organized code.
This can lead us to the next important development practice to keep in mind - clean code and easy readability.

3. Clean Code & Easy Readability

-->>Linting and formatting

The main goal here is to improve code quality and make it easy to read.
Most code setup workflows always contain a code linter and formatter.
A linter looks for and warns about syntactically (and even semantically) erroneous code whereas a code formatter (as the name suggests) works towards the more stylistic aspects of your code to ensure a set of formatting and styling guidelines consistent across your whole project.
Some of the most popular linters for Javascript are ESLint, JSLint and JSHint. For code formatting, you can look at Prettier.
The good thing here is that most IDEs/code editors like Visual Studio Code (VSCode), Atom, etc understand the importance of writing quality code and provide linting and formatting plugins that are super intuitive and extremely easy to set up.

-->>Add comments
When writing code, another important thing to be diligent about is adding helpful comments that other developers on your team can benefit from.
All it takes is just a five to six-word sentence to nudge your teammate in the right direction towards understanding the purpose of even the most complex of code snippets.
This saves everyone a lot of time and confusion and is therefore always a win-win situation.

4. Write asyncronous Code

Javascript is quite known for its callback functions (functions that can be passed as an argument to other functions).
They also allow you to define asynchronous behavior in Javascript.
The problem with callbacks is that - as your number of chained operations increase, your code gets clunkier and unwieldy, resulting in what is infamously known as callback hell.
To solve this, ES 6 (ECMASCRIPT 2015) came out with the Promises API that made it much easier to write asynchronous code in Javascript.
On top of this, with ES 8 (2017), the async/await syntax was introduced to further simplify things and make the API even more intuitive and natural.

<script>
    async function get_data() { // async function
        await $.get('https://url.com/one')
        await $.get('https://url.com/two')
        let res = await $.get('https://url.com/three')
        console.log(res)
    }
</script>

5. Configuration files and Environment Variables

As your app scales, you’ll notice the requirement of certain global configuration options and settings to be accessible across all modules.
It is always a good practice to store these options together in a separate file inside a config folder in your project.
We looked at this folder previously in the folder structure section of this post.
This folder can contain all your different configuration options grouped in files based on their usage.

/config
├── index.js
├── module1.js
└── module2.js
└── module3.js  
Config folder example

These configuration options can contain either common, basic settings or secure API keys, database connection URLs etc.
The latter are supposed to be stored in .env files as environment variables. This is how a .env file stores data in the form of key-value pairs -

DB_HOST=localhost
DB_USER=root
DB_PASS=toor
Example .env file

require('dotenv').config()

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)

6. Testing, Error Handling

-->>Test your code
For people starting out in software development, it is quite common to overlook the importance of writing test cases for your code.
However, testing is integral to any software application - it allows you to test the validity, accuracy, and robustness of your code by bringing to light even the smallest inaccuracies - not only in the collective system but even in its atomic constituents in isolation.
Testing allows all of this and more, in a conveniently automated fashion.

const assert = require('assert');

describe('Basic addition test', () => {
it('should add up to 3', () => {
assert.equal(2 + 1, 3);
});

it('should equal 8', () => {
assert.equal(4 \* 2, 8);
});
});

-->>Error Handling

Instead of letting Node.js throw errors, interrupt code execution, even fail at times, we’d rather take charge of our application’s control flow by handling these error conditions.
This is what we can achieve through exception handling using try/catch blocks.
By empowering developers to programmatically manage such exceptions, it keeps things stable, facilitates easier debugging, and also prevents a poor end-user experience. Below is a basic try/catch block example in Node.js.

try {
if (xyzHappens) {
throw "my error message ⚠️"; // 🛫
}
}

        catch (e) {
          console.log(e); // 🛬
        }

        finally {
          console.log("Finally executed! 🏁");
        }

7. Code Compression and File Size

Gzip is a lossless file format (also a software application) used for compressing (and decompressing) files for faster network transfer.
It can therefore be extremely beneficial in compressing the web pages being served by our Node.js servers.

Frameworks like Express.js make setting up Gzip compression unbelievably easy using the compression middleware.
Using Gzip compression is also the number one tip that the Express.js documentation recommends for improving application performance.
Take a look at what the code for this looks like -

var compression = require('compression')
var express = require('express')
var app = express()
app.use(compression())

8. Third-party solutions
   Don’t reinvent the wheel. Don’t be greedy either.

Node.js has a huge developer community across the world. As far as third-party support is concerned, Node’s package manager, NPM is full of feature-rich, well maintained, well documented, frameworks, libraries and tools for any use case you can imagine. It is therefore very convenient for developers to plug these existing solutions into their code and make the most of their APIs.

As a developer, it helps to be on the lookout for tools that make your life easier.
Here are some popular Node.js libraries that can effectively enhance your coding workflows -

Nodemon, (automatically restarts application when code files are updated)
Gulp, Grunt, (automated task runners)
Winston, (logging framework)
Agenda (job scheduling),
Moment (working with date & time)
While these libraries and tools ease off a lot of the burden,
it is important to be intelligent and responsible about every package that we import.
We should be aware about the purpose, strengths and weaknesses of each package we import and ensure that we aren’t over-reliant on them.
