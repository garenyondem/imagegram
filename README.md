# imagegram

Node.js Express application that allows to post images with captions just like Instagram.

## Features

The application allows to post images to the feed and comment on posts.
Uploaded images will be processed asynchronously.


### Usage

1. Install mongoDB on your local with docker or provision a mongoDB instance from MongoDB Atlas.
2. Install Node.js version 16.13 or higher. 
3. Copy .env.example content to .env file, and set values for corresponding variables.
4. Now you can run the web service with the below commands.

```
$ npm install
$ npm run watch
```

The default port for the web service is 8989. You can alsywas override it through the .env file.

Now you are ready to call endpoints that are served by the web service.
Make sure to create a user first and note down its userId. Some endpoint calls expect to receive 'user-id' in the headers.
You will also have to note down postIds and commentIds to interact with most of the endpoints.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/9ae5a8c27f07fe6c0f5e)


### Tips

* There is a test image available in the test folder.
* Images are uploaded to public/uploads folder.
* Uploads are limited by .jpg, .png and .bmp formats and 100MB max file size.
* For each image upload a event will be triggered to fork a child process.
* Images are processed by a separate process.
* Processed images are written to public/serve folder.

### Tech

* Node.js
* TypeScript
* MongoDB
* mongoose
* jimp
* multer

### Improvement Ideas

* Separate comments to a separate collection in mongoDB and ref by commentIds
* Optimise comment sorting and splice on getPosts function. (will be a lot easier todo after the first bullet)
* Keep and serve images from object storage buckets.
* Replace Node.js child processes with serverless functions.
* Replace Node.js event manager with message queue.