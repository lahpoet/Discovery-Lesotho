# Discover Lesotho Tourism Website

This is a tourism website project about Lesotho, built with HTML, CSS, Bootstrap and JavaScript.

## What I used

- HTML5 semantic elements
- CSS3
- Bootstrap 5
- JavaScript
- LocalStorage
- Responsive design

## Pages

1. `index.html` - Home
2. `about.html` - About Lesotho
3. `destinations.html` - Destinations, search and filtering
4. `gallery.html` - Interactive gallery
5. `contact.html` - Contact form and booking calculator

## JavaScript features

- Dark/light mode
- LocalStorage
- Destination search
- Destination category filtering
- Dynamic destination cards
- Gallery modal/lightbox
- Previous/next gallery buttons
- Contact form validation
- Booking form validation
- Booking cost calculator
- Saved booking estimate

## How to run it

The easiest way is to open the folder in Visual Studio Code and use the Live Server extension.

You can also open `index.html` directly in a browser. An internet connection is recommended because Bootstrap and the sample images are loaded from online CDNs.

## Important student note

The forms are front-end demonstrations. They do not send real emails or create real hotel reservations. A real website would need a backend/database or a service such as Formspree.

The images are demonstration images loaded from Unsplash URLs. Before final submission, I should check the image licences/attribution requirements and replace them with properly licensed images if my lecturer requires local image assets.

## Suggested GitHub Pages setup

1. Create a GitHub repository.
2. Upload all files and folders.
3. Keep `index.html` in the main repository folder.
4. Open repository Settings.
5. Find Pages.
6. Choose deployment from the main branch.
7. Save and wait for GitHub Pages to publish.

## Simple presentation explanation

I used Bootstrap for responsive layout and components, but I also created my own CSS file because I did not want the website to look like the default Bootstrap design.

JavaScript is used for the search, category filters, image gallery, forms, dark mode, booking calculator and LocalStorage.

The comments in the code explain the important parts in simple language so I can understand and explain them during my demonstration.

## Version 2 changes
- Added local `images` folder with the picture assets used by the website.
- Changed the main page/background surfaces to silver-grey.
- Removed decorative emoji icons from the interface.
- Kept Bootstrap and JavaScript functionality.

## Image notes

The website uses real Lesotho photographs from Wikimedia Commons for Maletsunyane Falls, Katse Dam and Thaba-Bosiu. These photos are loaded from their original Wikimedia image URLs, so an internet connection is needed to show them. The existing `images/` folder and its SVG illustrations have been kept so the original folder structure is unchanged.

- Maletsunyane Falls photo by BagelBelt — public domain: https://commons.wikimedia.org/wiki/File:Maletsunyanefalls.JPG
- Katse Dam photo by SkyPixels — CC BY-SA 4.0: https://commons.wikimedia.org/wiki/File:Katse_Dam.jpg
- Thaba-Bosiu photo by Vanellus Foto — CC BY-SA 3.0 / GFDL: https://commons.wikimedia.org/wiki/File:Thaba_Bosiu.jpg

If you submit this project, keep these credits and follow the licence terms. For a fully offline website, download the image files from the source pages into `images/` and change the image URLs in `js/script.js`, `index.html`, `about.html`, `gallery.html` and `css/style.css` to local paths.
