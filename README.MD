# Auth0 + Angular 5 + .Net Core Web API
Appeared in my [Blog](#https://medium.com/@andaro74/auth0-angular-5-net-core-web-api-fea1b10c8ef4)

A couple of weeks ago I was working on a project in an Angular 5 Single Page Application that communicates with several .NET Core Web API Microservices. One of the main challenges I ran into was to find a way to authenticate the user among the different services that the application communicates with. After looking at different identity providers I decided to go with Auth0 as identity provider.

I created a concept application based on the official documentation provided by [Auth0](#https://auth0.com/) and also with the contributions of online samples. You can find the complete code in [Github](#https://github.com/andaro74/Angular-5-Net-Core-Web-API-with-Auth0).

### Authentication Workflow

1. User logs into Single Page Application
2. The application redirects the user to the Auth0 login screen
3. User enters credentials or registers as a new user
4. Auth0 returns an access token that the Single Page Application saves in local storage
5. The Single Page Application requests data from the .NET Core Web Api sending the Access Token in the Authorization Header
6. The .NET Core Web Api validates the token and reads any claims sent in the access token
7. Information about the authenticated user is available within the .NET Web API

Single Page Applications authenticate via [Implicit Grant](#https://auth0.com/docs/api-auth/tutorials/implicit-grant) Implicit Grant flow. The idea is that the application will never have a access to the username and password. It is the responsibility of a third party identity provider to authenticate the user and return a token that will allow the client application to get information about the user and having access to back-end APIs.

### Tutorial

Once you have cloned the code in the Github repository, you are going to find two projects: the client and the .Net Core Web Api application. The idea is that the Angular Single Page Application should contain TypeScript code and the Web API should contain all the services consumed by the client application.

![Solution](https://andarito.blob.core.windows.net/general/Solution.JPG)

### Auth0 Configuration

Before going through the code it is required to create a free account with Auth0. I will walkthrough the steps of configuring an application using Auth0 settings and how they are related to the client application.

### Single Page Application Authentication

Create a single page application to authenticate your client with the ClientID, Domain, CallbackURLs.

![Auth0 Applications](https://andarito.blob.core.windows.net/general/Auth0Application.JPG)

![Auth0 Configuration](https://andarito.blob.core.windows.net/general/Auth0ApplicationNameDomain.JPG)

### URIs Configuration

Configure the following properties [Allowed Web Origins, Allowed Logout URLs, Allowed Origins (CORS)], based on the URL that the SPA is running. You will need to add as many URIs depending on the environment that your application is running. Your local the application will be running on your localhost with port 44366. Once you authenticate the Auth0 needs to know where to redirect to your application.

![Auth Configuration](https://andarito.blob.core.windows.net/general/Callback.JPG)
 
### Backend API

Create an API that can be consumed from authorized applications. This API is required because the sample .NET solution contains an Angular project and a Web API project that needs to be handle token authentication.

![Backend API](https://andarito.blob.core.windows.net/general/Backend%20APIs.JPG)

![Backend API Settings](https://andarito.blob.core.windows.net/general/BackendAPIProperties.JPG)

### Source Code Configuration

Once you have created the SPA application and the Web API in Auth0, then you need to configure the projects in the source code.

### Client Single Page Application

Open the ClientAngular project and locate the auth-0-variables.ts to set the variables according to your Auth0 Settings.

![Auth Configuration Client Side](https://andarito.blob.core.windows.net/general/SinglePageApplicationConfiguaration.JPG)
 
1. ClientID: Id from the Sample SPA Auth0 application
2. Domain: Unique domain from the Sample SPA Auth0 application
3. CallbackURL: The URL that Auth0 will redirect once the user authenticates
4. ApiUrl: The unique URL that represents the API created in Auth0. This is the one called Identifier in the Backend API general settings.

### Web API Settings

Open the Web API project to configure the authentication properties according to your Auth0 API, so your backend application can know how to authenticate the token.

![Auth Configuration Backend](https://andarito.blob.core.windows.net/general/BackendAppSettings.JPG)

### Create a user

You can create a user in Auth0 by manually creating one within the Dashboard or by registering when initially loading the application. In this case I am creating a new user from the dashboard so you can have a user and password ready for your tests.

![Create Auth0 User](https://andarito.blob.core.windows.net/general/createuser.JPG)

### Running the application

Make sure that you set both projects to run at the same time, since the Client Application requires the Web API to provide operations.

Once the applications start, you need to log in so Auth0 displays the Auth0 login modal, then accept the consent modal to give permissions to read your profile and email information.

![Auth0 Sample Initial](https://andarito.blob.core.windows.net/general/ASPNETWEBAPIAUTH0INITIAL.JPG)

![Auth0 Login](https://andarito.blob.core.windows.net/general/InitialAuth.JPG)

### Authenticated Operations

Once you are authenticated you can have access to the left menu that contains different operations that demonstrate how your access token can display your information.

![log in](https://andarito.blob.core.windows.net/general/ASPNETWEBAPIAUTH0LOGEDIN.JPG)

### User Info

Displays information about the user by calling the userInfo endpoint that is located in the .NET Core Web API. It gets the access token and fetches user information from the Authentication Api Client provided by Auth0. This is the perfect case scenario where a Single Page Application requests data from a Web API and then the server side code calls another external Api.

![User Info](https://andarito.blob.core.windows.net/general/UserInfoHideout.JPG)

### Calling a public operation
![log in](https://andarito.blob.core.windows.net/general/ASPNETWEBAPIAUTH0PUBLICCALL.JPG)

### Calling a private operation
![log in](https://andarito.blob.core.windows.net/general/ASPNETWEBAPIAUTH0PRIVATECALL.JPG)

### Calling a private scope operation
![log in](https://andarito.blob.core.windows.net/general/ASPNETWEBAPIAUTH0PRIVATESCOPE.JPG)

### Conclusion

Token authentication with Auth0 is really easy and there is plenty of documentation on their site and online for different scenarios. I included other cases that I recommend you to review for your own needs. The purpose of this tutorial is to help you have a working sample as fast as possible. However, I recommend to read the Auth0 documentation and practice with this sample other cases that you need to implement for your company or projects.

### References

[Angular 2 Login](#https://auth0.com/docs/quickstart/spa/angular2/01-login)

[My Blog](#https://medium.com/@andaro74/auth0-angular-5-net-core-web-api-fea1b10c8ef4)
