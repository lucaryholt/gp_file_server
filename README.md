# GP File Server
General Purpose File Server

## Why?
I wanted a file server that I could reuse across my projects, without relying on services like S3.

## Usage
The functionality of this server is on purpose very limited. It only offers to store files, get the files and delete them - but only when specifically asked.
It is the responsibility of whoever used this server, to delete files that are no longer needed, as the server does not keep track of what files it has stored.

Because of this every request to the server must be authenticated.

## Configuration
The server needs a **.env** file simply called **.env**, in its root directory.
In this file you need to configure the following fields:
```
AUTHENTICATION_KEY=

ACCESS_TOKEN_SECRET=

UPLOAD_DIRECTORY_ABSOLUTE_PATH=

UPLOAD_DIRECTORY_RELATIVE_PATH=

ACCESS_PORT=
```

 - *AUTHENTICATION_KEY* represents the 'password' for the server that the services using it, needs to 'login'.

 - *ACCESS_TOKEN_SECRET* is a value that **JWT** uses to sign authentication attempts. 
   - Safest to use a random string (could be generated with the *randomBytes()* method in the *crypto* library).

 - *UPLOAD_DIRECTORY_ABSOLUTE_PATH* and *UPLOAD_DIRECTORY_RELATIVE_PATH* are the path where files are stored.
   - If *UPLOAD_DIRECTORY_ABSOLUTE_PATH* is set, then it overwrites *UPLOAD_DIRECTORY_RELATIVE_PATH*.
   - *UPLOAD_DIRECTORY_RELATIVE_PATH* is relative to the root directory of the server.

 - *ACCESS_PORT* is the port where the server will listen for HTTP requests.
 
## Running the server
To run the server you can run **npm run start-prod** in the server directory. 