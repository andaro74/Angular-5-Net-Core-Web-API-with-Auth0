# Auth0 + Angular 5 + .Net Core Web API
A couple of weeks ago I was working on a project in an Angular 5 Single Page Application that communicates with several .NET Core Web API Microservices. One of the main challenges I ran into was to find a way to authenticate the user among the different services that the application communicates. After looking at different identity providers I decided to go with Auth0 as identity provider.

I created a concept application based on the official documentation provid
ed by Auth0.

### Authentication Workflow

Here is the authentication workflow that the Single Page Application will go through when accessing a protected Web API. 
1. User logs into Single Page Application
2. The application redirects the user to the Auth0 login screen
3. User enters credentials or registers as a new user
4. Auth0 returns an access token that the Single Page Application saves in local storage
5. The Single Page Application requests data from the .NET Core Web Api sending the Access Token in the Authorization Header
6. The .NET Core Web Api validates the token and reads any claims sent in the access token
7. Information about the authenticated user is available within the .NET Web API


Single Page Applications authenticate using an Implicit Grant flow. The idea is that the application will never have a access to the username and password typed by the user. It is the responsibility of a third party identity provider to authenticate the user and return a token that will allow the client application to get information about the user and having access to backend APIs.
The code is available in my GitHub account.

### Sample Application

Clone the repository and build both of the applications: Client Angular and Auth0 WebApi
Make sure to start both applications when running the sample

### Start

![before login](https://andarito.blob.core.windows.net/general/ASPNETWEBAPIAUTH0INITIAL.JPG)

#### Log In

![log in](https://andarito.blob.core.windows.net/general/ASPNETWEBAPIAUTH0LOGINGIN.JPG)
