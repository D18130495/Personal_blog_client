# Personal_blog_client
# LEGO Repositories, Help you find all Lego sets.

[HuaruoYM Blog](https://huaruoyumu.com/).

## Project Introduction
- [Project Description](#Project-description)
- [Technology Selection](#technology-selection)
- [Project structure](#project-structure)
- [Get started with this project](#get-started-with-this-project)
- [Model definition for database](#model-definition-for-database)
- [API for the each request](#api-for-the-each-request)
- [Project Introduction](#project-introduction)

## Project Description
This is a website for querying Lego sets information.<br>
In this project, there are three main modules and functions:
- Search Lego information: Use to search Lego sets information. 
- Manage Lego sets information: Use to manage Lego sets theme and release year, manage the details of Lego sets. 
- Manage user: Use to manage the user information.

## Technology Selection

### Front-end
|     Technology     |        Description       |                Official website                |
| :----------------: | :----------------------: | :--------------------------------------------: |
|       React        |    Front-end framework   |               https://reactjs.org/             |
|     Ant Design     |  React UI Component Repo |           https://ant.design/index-cn          |
|     Ajax(Axios)    | Send asynchronous request|                                                |

### Back-end
|     Technology     |        Description       |                Official website                |
| :----------------: | :----------------------: | :--------------------------------------------: |
|      Node.js       |  JavaScript Environment  |               https://nodejs.org/              |
|      Express       |   Node.js Web Framework  |                                                |
|      MongoDB       |  Non-relational database |             https://www.mongodb.com/           |

### This project used our repositories from GitHub
1. - The purpose of using is to reset css style, in order to make some elements look better.
   - reset.css [jgthms/minireset.css](https://github.com/jgthms/minireset.css)(many thanks)

2. - The purpose of using is to add text editor, wysiwyg(What you see is what you get).
   - wysiwyg [jpuri/react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)(many thanks)

## Project structure

```
LEGO Repositories
├── api -- Axios to send Ajax requests(GET, POST)
│       ├── ajax.js -- Use Axios to send Ajax request
│       └── index.js -- Encapsulate all request, and defined request URL
│
├── assets -- General resources
│
├── components -- Some components of page ├── Add category form
│                                         ├── Add or update user form
│                                         ├── Add permission tree
│                                         ├── Main page header
│                                         ├── Main page left menu bar
│                                         ├── Update category form
│                                         ├── Upload image components
│                                         └── wysiwyg text editor
│
├── pages ├── home -- main page to show search function
│         ├──   ├──home -- route page of the home
│         ├──   ├──setInfoHome -- get the set information from the db and display through the list
│         ├──   └──detail -- the detail page to display more specific information of set
│         ├──        
│         ├── login -- login page to let user login the system       
│         ├──   ├── images -- background image of the login page
│         ├──   └── login -- the login page
│         ├──
│         ├── main -- main page to show the layout of this website
│         ├──   └── main -- the layout of the main page
│         ├──
│         ├── setInfo -- page to display set information
│         ├──   ├── addOrUpdate -- use to add or update the set information
│         ├──   ├── detail -- the page to show the details of the Lego set 
│         ├──   ├── setInfo -- the page as router for setInfo function
│         ├──   └── setInfoHome -- the page use to display the list of all sets
│         ├──
│         ├── theme -- manage the Lego theme
│         ├──   └── theme -- the page to manage the Lego theme
│         ├──
│         └── user -- manage the system user
│               └── user -- the page to manage the login user
│
├── utils -- some utils ├── currentTime.js -- Format and get current time
│                       ├── memoryUser.js -- Store the current login user's name
│                       └── storeUserName.js -- Save, load and delete the current login user
│
├── App.js -- Main router
│
└── index.js -- The main entrance of the website

```

## Get started with this project.
1. The deployment process of the front-end, back-end and database are all in Deployment.md<br>
    [Back-end](https://github.com/D18130495/LEGO_repository-React_server)
2. Deployment.md is the deployment process.<br>
    [Deployment Process](docs/Deployment.md)
3. sets.json, users.json, categorys.json are the Json file for the MongoDB database.<br>
    [MongoDB Json files](docs/Json)

## Model definition for database.

### Category
```
// This is use to store the theme and year, if parentId equal to 0, mean this is theme,
// if parentId not equal to 0, mean this is year.
name: {type: String, required: true}// the name of the category
parentId: {type: String, required: true, default: '0'} // the parent ID of the category
```
### Set
```
categoryId: {type: String, required: true} // category ID, year of the set, such as(2021, 2020, 2019)
pCategoryId: {type: String, required: true}// parent category ID, such as(Architecture, Batman™, Harry Potter™)
name: {type: String, required: true} // name of set
price: {type: Number, required: true} // price of set
desc: {type: String} // short desc of set
imgs: {type: Array, default: []} // address of images
detail: {type: String} // detail of the set
```

### User
```
username: {type: String, required: true}, // user name 
password: {type: String, required: true}, // user password
phone: String, // user phone number
email: String, // user email
create_time: {type: Number, default: Date.now}, // create time
menus: Array // user can visit which function
```

## API for the each request.
1. http://localhost:41571/login: use for user login (POST)
2. http://localhost:41571/manage/category/list: use for get category list (GET)
3. http://localhost:41571/manage/category/add: use for add category list (POST)
4. http://localhost:41571/manage/category/update: use for update category list, can be theme or year (POST)
5. http://localhost:41571/manage/category/year: use for get year list (GET)
6. http://localhost:41571/manage/category/year/delete: use for delete year (GET)

7. http://localhost:41571/manage/set/add: use for add set information (POST)
8. http://localhost:41571/manage/set/update: use for update set information (POST)
9. http://localhost:41571/manage/set/delete: use for delete set information (POST)
10. http://localhost:41571/manage/set/list: use to get set list (GET)
11. http://localhost:41571/manage/set/search: use to get set list by pagination (GET)

12. http://localhost:41571/manage/user/list: use for get user list (GET)
13. http://localhost:41571/manage/user/add: use for add user (POST)
14. http://localhost:41571/manage/user/update: use for update user (POST)
15. http://localhost:41571/manage/user/delete: use for delete user (POST)

16. http://localhost:41571/manage/img/upload: use for upload images (POST)
17. http://localhost:41571/manage/img/delete: use for delete images (POST)

## Project Introduction
### Login page
The login page provides user verification function, input verification.<br>
![login.jpg](docs/images/login.jpg) <center>Show login page</center><br>

### Overall layout
This is the overall layout of this project.<br>
On the left is the navigation bar, click to jump to the corresponding function.<br>
Above is the header part to display the currently logged in user and the current time, the user can log out through the button in the upper right corner.<br>
The middle part is the main display area for different functions.<br>
![overall.jpg](docs/images/overall.jpg) <center>Show overall looking of the website</center><br>

### Detailed description of different module functions
1. Home:<br>
Home part provide user search and display set detail function. The user can query the Lego set by entering the number corresponding to the set in the search box, you can enter all or half of the number. This search function provides a fuzzy query function to help users find Lego sets better.<br>
![home_search.jpg](docs/images/home_search.jpg) <center>Show fuzzy query</center><br>
When you click the detail button on the back side, the detailed information of this set will be displayed.<br>
![home_detail.jpg](docs/images/home_detail.jpg) <center>Show overall looking of the website</center><br>

2. Manage LEGO sets:<br>
Two functions are mainly involved in this module.<br>
The first function is to add the theme and year of the set. This is used to add detailed information about the set later.<br>
The second function is to add specific information about the set.<br>
![add_theme_overall.jpg](docs/images/add_theme_overall.jpg) <center>Show overall page of add theme</center><br>
![add_theme_add.jpg](docs/images/add_theme_add.jpg) <center>Show add theme table</center><br>
![add_theme_update.jpg](docs/images/add_theme_update.jpg) <center>Show update theme table</center><br>
![add_theme_year_overall.jpg](docs/images/add_theme_year_overall.jpg) <center>Show add year overall</center>
The add and update function is same as above.<br>

3. Manage user:<br>
This part mainly implements the functions of adding users, modifying users, deleting users and authorization.<br>
![manage_user_overall.jpg](docs/images/manage_user_overall.jpg) <center>Show overall manage user page</center><br>
![manage_user_add.jpg](docs/images/manage_user_update.jpg) <center>Show add user table</center><br>
![manage_user_update.jpg](docs/images/manage_user_update.jpg) <center>Show update user table</center><br>
Authorization in the manage user function is use to make log in user can visit some function or not.<br>
The above user has all auth, so he can visit all the function, the follow picture will show the user who do not have all auth, and can only visit partial function.<br>
![manage_user_auth.jpg](docs/images/manage_user_auth.jpg) <center>Show auth user</center><br>
![manage_user_auth_show.jpg](docs/images/manage_user_auth_show.jpg) <center>Show user without the auth, he can only visit partial function</center><br>

## Youtube video
[![YouTube](http://img.youtube.com/vi/5aR31m6A3dE/0.jpg)](https://youtu.be/5aR31m6A3dE)