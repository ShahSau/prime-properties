<p align="center">
    <h1 align="center">PRIME-PROPERTIES</h1>
</p>
<p align="center">
    <em>
     It's a MERN stack webapp for an real estate agency named prime properties
    </em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/ShahSau/prime-properties?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ShahSau/prime-properties?style=flat&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ShahSau/prime-properties?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ShahSau/prime-properties?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white" alt="tailwindCss">
    <img src="https://img.shields.io/badge/Firebase-FFCA28.svg?style=flat&logo=Firebase&logoColor=black" alt="Firebase">
    <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white" alt="redux">
    <img src="https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens" alr="JWT">
    <img src="https://img.shields.io/badge/i18next-26A69A.svg?style=flat&logo=i18next&logoColor=white" alt="i18next">
	<br>
    <img src="https://img.shields.io/badge/Framer-black?style=flat&logo=framer&logoColor=blue" alt="Framer-motion">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white" alt="mongodb">
	<img src="https://img.shields.io/badge/Swiper-6332F6.svg?style=flat&logo=Swiper&logoColor=white" alt="Swiper">
    <img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
    <img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
    <img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#📍-overview)
> - [📦 Features](#📦-features)
> - [📂 Repository Structure](#📂-repository-structure)
> - [🧩 Modules](#🧩-modules)
> - [🚀 Getting Started](#🚀-getting-started)
>   - [⚙️ Installation](#⚙️-installation)
>   - [🤖 Running prime-properties](#🤖-running-prime-properties)
> - [🛠 Project Roadmap](#🛠-project-roadmap)
> - [📄 License](#📄-license)

---

## 📍 Overview

Prime properties is a comprehensive platform built using the MERN (MongoDB, Express.js, React, Node.js) stack
---

## 📦 Features

Prime properties integrates language switching between English, German, and Finnish, employs JWT for secure authentication, utilizes Google Login for seamless onboarding, adopts Redux for efficient state management, and introduces favorites listing and role-based authorization to ensure a tailored, the dynamic motion design of Framer Motion, firebase for image upload and secure user experience.

Multilingual Support:
Seamlessly switch between English, German, and Finnish to provide users with a personalized and comfortable experience in their preferred language.

JWT and Firebase for Authentication:
Ensure robust security with JSON Web Token (JWT) authentication and Firebase. Safeguard user data and transactions with state-of-the-art encryption and secure access control. and Firebase.
Google Login:
Streamline user onboarding with the convenience of Google Login. Enhance user adoption by simplifying the registration process and improving overall accessibility.

Redux for State Management:
Optimize the efficiency of your application with Redux, a powerful state management tool. Centralize and manage application state for smoother user interactions.

Favorites Listing:
Allow users to curate their personalized experience by creating and managing a favorites list. 

Role-Based Authorization:
Implement a secure and granular access control system based on user roles. Define specific permissions for different user types, ensuring a tailored and secure user experience.

Email landlord:
Emailing the landlord about the listing.

Framer Motion for Dynamic Design:
Elevate the visual appeal of your platform with Framer Motion, a powerful motion design library. 

Firebase Image Upload:
Enable users to seamlessly upload images through Firebase

---

## 📂 Repository Structure

```sh
└── prime-properties/
    ├── .eslintignore
    ├── .eslintrc.cjs
    ├── api
    │   ├── controllers
    │   │   ├── auth.controller.js
    │   │   ├── listing.controller.js
    │   │   └── user.controller.js
    │   ├── index.js
    │   ├── models
    │   │   ├── listing.model.js
    │   │   └── user.model.js
    │   ├── routes
    │   │   ├── auth.route.js
    │   │   ├── listing.route.js
    │   │   └── user.route.js
    │   └── utils
    │       ├── error.js
    │       └── verifyUser.js
    ├── client
    │   ├── .eslintrc.cjs
    │   ├── i18n-parser.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── public
    │   │   └── locales
    │   ├── src
    │   │   ├── AnimatedRoutes.jsx
    │   │   ├── App.jsx
    │   │   ├── components
    │   │   ├── firebase.js
    │   │   ├── i18n.js
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   ├── pages
    │   │   └── redux
    │   ├── tailwind.config.js
    │   ├── variants.js
    │   └── vite.config.js
    ├── package-lock.json
    └── package.json
```

---

## 🧩 Modules

<details closed><summary>client</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                               |
| ---                                                                                                           | ---                                                                                                                                                                                                                                   |
| [variants.js](https://github.com/ShahSau/prime-properties/blob/master/client/variants.js)                     | Framer motion variant          |
| [i18n-parser.config.js](https://github.com/ShahSau/prime-properties/blob/master/client/i18n-parser.config.js) | i18n config file  |
| [vite.config.js](https://github.com/ShahSau/prime-properties/blob/master/client/vite.config.js)               | Vite config file      |
| [tailwind.config.js](https://github.com/ShahSau/prime-properties/blob/master/client/tailwind.config.js)       | TailwindCSS config file    |

</details>

<details closed><summary>client.public.locales.de</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                            |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                |
| [translation.json](https://github.com/ShahSau/prime-properties/blob/master/client/public/locales/de/translation.json) | German language dictionary |

</details>

<details closed><summary>client.public.locales.en</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                            |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                |
| [translation.json](https://github.com/ShahSau/prime-properties/blob/master/client/public/locales/en/translation.json) | English language dictionary |

</details>

<details closed><summary>client.public.locales.fi</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                            |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                |
| [translation.json](https://github.com/ShahSau/prime-properties/blob/master/client/public/locales/fi/translation.json) | Finnish language dictionary |

</details>

<details closed><summary>client.src</summary>

| File                                                                                                        | Summary                                                                                                                                                                                                                                |
| ---                                                                                                         | ---                                                                                                                                                                                                                                    |
| [main.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/main.jsx)                     | Root of the file           |
| [AnimatedRoutes.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/AnimatedRoutes.jsx) | Routing in the client side of the app |
| [i18n.js](https://github.com/ShahSau/prime-properties/blob/master/client/src/i18n.js)                       | Language Switcher           |
|             |
| [firebase.js](https://github.com/ShahSau/prime-properties/blob/master/client/src/firebase.js)               | Firebase config        |
|           |

</details>

<details closed><summary>client.src.components</summary>

| File                                                                                                                       | Summary                                                                                                                                                                                                                                             |
| ---                                                                                                                        | ---                                                                                                                                                                                                                                                 |
| [OAuth.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/OAuth.jsx)                       | Authentication component            |
| [Header.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/Header.jsx)                     | Header component          |
| [ListingItem.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/ListingItem.jsx)           | Individual listing component      |
| [LanguageDropdown.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/LanguageDropdown.jsx) | Language dropdown component |
| [Contact.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/Contact.jsx)                   | Contact component          |
| [PrivateRoute.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/PrivateRoute.jsx)         | Private route component    |
| [Transition.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/Transition.jsx)             | Translation component      |
| [ItemListing.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/components/ItemListing.jsx)           | Individual listing component (seller view)     |

</details>

<details closed><summary>client.src.pages</summary>

| File                                                                                                            | Summary                                                                                                                                                                                                                                     |
| ---                                                                                                             | ---                                                                                                                                                                                                                                         |
| [Home.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/Home.jsx)                   | Home page         |
| [CreateListing.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/CreateListing.jsx) | Create a listing page|
| [UpdateListing.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/UpdateListing.jsx) | Update a listing (only visible to the advertizer) |
| [Profile.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/Profile.jsx)             | Profile page       |
| [Signin.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/Signin.jsx)               | Signin page       |
| [Search.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/Search.jsx)               | search page       |
| [About.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/About.jsx)                 | About page         |
| [Listing.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/Listing.jsx)             | All listings page       |
| [SignUp.jsx](https://github.com/ShahSau/prime-properties/blob/master/client/src/pages/SignUp.jsx)               | Signup page       |

</details>

<details closed><summary>client.src.redux</summary>

| File                                                                                          | Summary                                                                                                                                                                                                                            |
| ---                                                                                           | ---                                                                                                                                                                                                                                |
| [store.js](https://github.com/ShahSau/prime-properties/blob/master/client/src/redux/store.js) | Redux store |

</details>


<details closed><summary>api.utils</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                          |
| ---                                                                                              | ---                                                                                                                                                                                                                              |
| [error.js](https://github.com/ShahSau/prime-properties/blob/master/api/utils/error.js)           | Error handler      |
| [verifyUser.js](https://github.com/ShahSau/prime-properties/blob/master/api/utils/verifyUser.js) | User token verification |

</details>

<details closed><summary>api.routes</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                              |
| ---                                                                                                     | ---                                                                                                                                                                                                                                  |
| [listing.route.js](https://github.com/ShahSau/prime-properties/blob/master/api/routes/listing.route.js) | Listing Route |
| [auth.route.js](https://github.com/ShahSau/prime-properties/blob/master/api/routes/auth.route.js)       | Authentication route    |
| [user.route.js](https://github.com/ShahSau/prime-properties/blob/master/api/routes/user.route.js)       | User route   |

</details>

<details closed><summary>api.models</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                              |
| ---                                                                                                     | ---                                                                                                                                                                                                                                  |
| [listing.model.js](https://github.com/ShahSau/prime-properties/blob/master/api/models/listing.model.js) | Listing model |
| [user.model.js](https://github.com/ShahSau/prime-properties/blob/master/api/models/user.model.js)       | User model   |

</details>

<details closed><summary>api.controllers</summary>

| File                                                                                                                   | Summary                                                                                                                                                                                                                                        |
| ---                                                                                                                    | ---                                                                                                                                                                                                                                            |
| [listing.controller.js](https://github.com/ShahSau/prime-properties/blob/master/api/controllers/listing.controller.js) | Listing controller |
| [auth.controller.js](https://github.com/ShahSau/prime-properties/blob/master/api/controllers/auth.controller.js)       | Authentication controller    |
| [user.controller.js](https://github.com/ShahSau/prime-properties/blob/master/api/controllers/user.controller.js)       | User controller   |

</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **node**: `version > = 16.0.0`
* **firebase**: `version >=10.3.1`
* **react**: `version 18.2.0`

### ⚙️ Installation

1. Clone the prime-properties repository:

```sh
git clone https://github.com/ShahSau/prime-properties
```

2. Change to the project directory:

```sh
cd prime-properties
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running prime-properties


Use the following command to run prime-properties:

Run backend
Create an .env file with following keys: <br />
`MONGO` <br />
`JWT_SECRET` <br />

```sh 
npm run dev
```
Run frontend
Create an .env file with following keys: <br />
`VITE_FIREBASE_API_KEY`
```sh
cd client
npm run dev
```

---

## 🛠 Project Roadmap

- [ ] `► Docker`


---

## 📄 License

This project is protected under the MIT License.

---

