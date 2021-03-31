# Static Node.js and Express Site 6
 
This is my portfolio project. This app showcases everything I've built to date and highlights some of my skills. 
I am going for exceeds expectations with this project.

The changes I've made for the extra credit portion of this project are as follows:
1. I added a stylesheet called ECstyles.css where I made some changes to the back button. I did this becuase when you reach my 404 error page, the button blended in with the text.
For this reason, I gave it a background color as well as a different color on hover and I rounded out the buttons with border-radius to give it a more smooth look.
2. I also added a transform effect on hover of the project thumbnails. I used "a .thumbail" in my ECstyles.css file to only have the effect on the project thumbnail and not my profile pic.
3. I added a border-radius of 4px to the live demo and the github buttons as well by targeting the .btn-link class.
4. I added the line "start": "node app.js" to the script portion of the package.json so that the app will run with the npm start command.
5. I created helpful pug templates in my error handling middleware by creating error.pug and page-not-found.pug views and rendering those with specific errors. For example, a 404 error would render the page-not-found.pug view and a 500 error will render the error.pug view.

