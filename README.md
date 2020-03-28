RNMC Clothes
===================================

A fully functional e-commerce web app powered by React.

Working example [here](https://rnmcclothes.herokuapp.com/checkout)

Overview
-----------------------------------

As the title says, nothing but functional e-commerce app, an Outlet one to be precise. You can browse each category and check for the items there, add items to your cart and check out. Payment simulation is available if you want to test it.

User authentication and session persistance is handled. You can log in, close the browser and reopen it, and the app should still reckon it is you. Speaking of which, you can sign up, and log in with either your signed up email and password or with your Google account. Firebase handles both.

This is one of the most complete and functional apps I have uploaded up to now. Create-react-app was used to initialize the project, but the magic wouldn't have sparkled without the whole ecosystem that surrounds it. Redux, Redux Persist, Redux Sagas, React-Router, React Lazy and Suspense, ErrorBoundary, Firebase Firestore, NodeJS, Express, Styled Components, Stripe payments and some other libraries and utilities made what you see here possible.

It also works offline, as it is also a Progressive Web App. Open the webpage where the site is hosted with a mobile device and it will ask you if you wish to download it. Or, open it from a laptop/PC using a compatible browser (preferably Google Chrome), and download it from that browser's menu.

I have put this app together following Andrei Neagoie and Yihua Zhang's proposed exercise on their ["Complete React Developer in 2020" Udemy course](https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/). Props to them, I learned way more of what I imagine I would get of an online course. They explained everything in detail, gave plenty of examples and really pushed me to become a better React developer. I definitely recommend them as instructors and that course in particular!

As for my other projects, please feel free to go to [my GitHub page](https://github.com/RenzoMurinaCadierno) to check them out. I am still on my learning tracks, so you will see new projects frequently. I specialize in Python and Javascript, and whatever I upload is normally related to web, game and app development, or Python scripting for multiple purposes.


How things are wired up
-----------------------------------

This project was made to practise on many React-ecosystem concepts and interactions. **Create-react-app** was used as a kickstarter, but plenty of custom functionality and many libraries were added to enrich it.

State management is handled by **Redux** and its environment and **Reselect** to generate the respective selectors to create helper utility functions and pass them to actions. **Redux Sagas** was included to deal with async state management, and **Redux Persist** to keep state management up.

**React-router** is responsible for routing all requests to each endpoint, and **React Lazy**, **ErrorBoundary** and **Suspense** for rendering them asynchronously while failing gracefully on any encountered errors (like routing while being offline).

**Firestore** powers the database, where User and Collection Item objects are stored. User authentication is handled there and Firestore rules are customized to only allow registered users to modify their own Cart item list. Only the admin is able to update or delete Collection Item and User objects.

**Stripe** is set up to handle payments, which you can test in the app. Of course, these ones are mock payments, as this is a practise project.

**NodeJS** and **Express** build up the backend server to deal with "real" payments, where Stripe secret key is set up to enable payments (though hidden in a file not pushed to this repo). This small backend also enables the browser to detect the service worker in order to cache the necessary files for offline compatibility.

**Styled components** is applied on some files and **SASS** on other ones. No particular reason for this, as both methods were taken to expand my knowledge on them. Compilers will handle both, so, why not?

The App is **PWA**-friendly, so try downloading directly from a compatible browser or from a mobile device. Of course, keep in mind you will not be able to log in if you are offline.


What can you do in this project?
-----------------------------------

- Sign up.
- Log in providing email and password used to sign in.
- Log in with your Google account.
- Navigate through all categories.
- Add/remove items to your cart.
- Checkout with Stripe (test purposes, not real payments).
- Download the app to use offline (for mobile devices and compatible browsers).


What I learned from this project
-----------------------------------

- Redux ecosystem in huge to say the least. Almost all concepts I learned in this project I have never heard of. Thunks was a little familiar to me, but Sagas caught me totally off-guard. It took me some time to understand and I still have lots of practise ahead to master it. But boy I see why it is so widely used, since it aids to functional programming in React in an organized and convenient way, as well as it handles state so gracefully that components can be reused at will, only by requiring state and actions from Redux (without the need of being bound to any other component in the structure).
- As I have used Hooks in other projects and having centered this one fully on Redux, I can honestly see why Hooks are a blessing when it comes to small apps and drag-and-drop individual components. They can simplify lots of additional setup and maintainance Redux environment, context or history management libraries would require. Do not get me wrong, those parties are outstanding at what they do and they are used in large companies for a reason, but Hooks' power of simplicity and direct React compatibility with such little code makes it stand apart for certain small projects and for features of big ones.
- Though not applied in this project, I've tinkered a little with GraphQL and I can say it is powerful indeed. Even though it takes learning its own language, itself and Apollo's compatibility with React make queying the database a lot more efficient. Definitely something worth considering in order to decrease the amount of times the database has to be hit to query for specific data or to mutate it, and an interesting skill to add to your resume that can be helpful in several projects, not only concerning React.
- PWAs are next level stuff, no wonder why Google push them forward. The ability to transform an already built web app to a mobile-friendly one with just a couple of extra steps is awesome. This is really convenient to have some basic frontend functionality ready without the need of other libraries, frameworks or languages like React Native, Flutter or Kotlin. However, PWAs are long away from being real Native apps, so they have their flaws. Even though I have already created some PWAs before converting this one, I was amazed with how well this one developed. I will experiment with them more in the future.
- Many more things, really. A good title for this section would have been "what I did not learn" instead.

### Thank you for taking your time to check this project out!
