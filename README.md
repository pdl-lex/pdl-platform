# LexoTerm: Lexicographic Research App

A React-based web application for German lexicographic research built with [Vite](https://vite.dev/)
and [Mantine UI](https://mantine.dev/). The app is developed as part of the academy project
*New Potentials for German Digital Lexicography*. To learn more about the project, feel free to
browse the German project website at [https://pdl.badw.de](https://pdl.badw.de/das-projekt.html) (in
German).

## Setup

After cloning the repository, run `npm install` to set up the dependencies.

Optionally, for deploying the app, create a file named .env.local in the project root (next to
vite.config.ts) and set the following variables.

```sh
VITE_VM_URL   # host of the production server
VITE_API_URL  # host of the api instance, e.g. http://127.0.0.1:8000
VITE_PAYLOAD_URL  # host of the Payload CMS instance, e.g. https://cms.example.org
```

## Starting the Development Server

To run the app locally, execute `npm run dev`.
