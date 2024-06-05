# Project Exam - Blog

This is my exam project about creating a blog with all its contents.
Preview on netlify link: https://hotllabstech.netlify.app

## Contents

1. [Functions and Info for the Project](#functions-and-info-for-the-project)
2. [Tutorial](#tutorial)
3. [API and Endpoints](#api-and-endpoints)

---

### Functions and Info for the Project

- Login
- Create post / pictures / titles
- Only authenticated users should be able to log in (block other logins)
- Use API for the blog posts
- Assets and Figma

#### Update
Latest push/patch is on the "rm-logs" branch but is currently not merged with the main branch.
- Contains refactor and code cleaning
- Styling improvements
- Console logs and catch tests removed
(Waiting on pagination, burger menu, coherent post list styling before merging)

#### authenticated user for project
Mail: kendoll@stud.noroff.no
Name: kenblog
Pass: 12345678

---

### Tutorial

#### 1. How to Create a User
To create a user, go to the register page or via login and register. Mail must contain "@stud.noroff.no" or API won't recognize the mail. Password must be 8 characters.

#### 2. How to Login
To log in, go to the login page, enter your credentials created in the register page. You must input mail with "@stud.noroff.no" and name in the username. Add your created name in the username; don't use generated username or the API will not respond correctly.

#### 3. How to Create a Post
To create a post, a user must be authenticated. Click on the edit page from navigation or directly from copy path. Add title, image URL (must be directed to an image and not a site/page, etc.), image alt, and body content. When done, press the submit button.

#### 4. How to Edit Posts
To edit a post, a user must be authenticated (logged in with a registered user). Click on a post, and you will see its ID. Copy the ID and add it to the ID field. Press load button, and post info will appear. Edit post and press "save" or "delete" to make changes to the post.

---

### API and Endpoints

#### API for Different Tasks
Main API for the project is provided by Noroff: `https://v2.api.noroff.dev/`. This API is used and changes endpoints for which task is needed.

#### Endpoints for Fetching API Requests
- GET /blog/posts/<name>
- GET /blog/posts/<name>/<id>
- POST /blog/posts/<name>
- PUT /blog/posts/<name>/<id>
- POST /blog/posts/<name>/<id>
- DELETE /blog/posts/<name>/<id>
- POST /auth/register
- POST /auth/login

---

#### Summary of project:

Creating a functional webpage which can be used as a blog plattform for a company or for private use.
It contains all the necessary functions for login, creating a user, editing, creating and deleting a post. 



Still updating!! 




