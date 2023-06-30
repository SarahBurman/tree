This project is an application that emulates a file system search, consisting of a client and server.

<strong style="font-size: 24px;">Server</strong>
The server is implemented using Express API and provides a single URL endpoint.

<strong style="font-size: 24px;">API Endpoints</strong>
GET /files: Returns the entire file system structure as JSON data.
GET /files?q=<prefix>: Returns directories, subdirectories, and files that match the specified prefix.

<strong style="font-size: 24px;">Client</strong>
The client-side of the application is implemented using Angular, following industry best practices.

<strong style="font-size: 24px;">Features</strong>
+ Single-page application with a centralized user interface.
+ Displays the file system structure obtained from the server.
+ Provides a text input that triggers a request to the server and dynamically updates the Tree View based on the input.

<strong style="font-size: 24px;"> During the development process, the following assumptions were made: </strong>
+The server utilizes a predefined JSON data structure to represent the file system - the structer was: 
an array of directoried, where a directory looks like this in the server:
interface Directory = {
    name: string,
    files: Array<string>,
    directories: Array<Array<Directory>>

}.
+In the client the structer was flattered a bit.
+The client application is a single-page application without any router configuration.
