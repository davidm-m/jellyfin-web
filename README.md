<h1 align="center">Jellyfin Web</h1>
<h3 align="center">Part of the <a href="https://jellyfin.org">Jellyfin Project</a></h3>

---

<p align="center">
<img alt="Logo Banner" src="https://raw.githubusercontent.com/jellyfin/jellyfin-ux/master/branding/SVG/banner-logo-solid.svg?sanitize=true"/>
<br/>
<br/>
<a href="https://github.com/jellyfin/jellyfin-web">
<img alt="GPL 2.0 License" src="https://img.shields.io/github/license/jellyfin/jellyfin-web.svg"/>
</a>
<a href="https://github.com/jellyfin/jellyfin-web/releases">
<img alt="Current Release" src="https://img.shields.io/github/release/jellyfin/jellyfin-web.svg"/>
</a>
<a href="https://translate.jellyfin.org/projects/jellyfin/jellyfin-web/?utm_source=widget">
<img src="https://translate.jellyfin.org/widgets/jellyfin/-/jellyfin-web/svg-badge.svg" alt="Translation Status"/>
</a>
<br/>
<a href="https://opencollective.com/jellyfin">
<img alt="Donate" src="https://img.shields.io/opencollective/all/jellyfin.svg?label=backers"/>
</a>
<a href="https://features.jellyfin.org">
<img alt="Feature Requests" src="https://img.shields.io/badge/fider-vote%20on%20features-success.svg"/>
</a>
<a href="https://matrix.to/#/+jellyfin:matrix.org">
<img alt="Chat on Matrix" src="https://img.shields.io/matrix/jellyfin:matrix.org.svg?logo=matrix"/>
</a>
<a href="https://www.reddit.com/r/jellyfin">
<img alt="Join our Subreddit" src="https://img.shields.io/badge/reddit-r%2Fjellyfin-%23FF5700.svg"/>
</a>
</p>

Jellyfin Web is the frontend used for most of the clients available for end users, such as desktop browsers, Android, and iOS. We welcome all contributions and pull requests! If you have a larger feature in mind please open an issue so we can discuss the implementation before you start. Translations can be improved very easily from our <a href="https://translate.jellyfin.org/projects/jellyfin/jellyfin-web">Weblate</a> instance. Look through the following graphic to see if your native language could use some work!

<a href="https://translate.jellyfin.org/engage/jellyfin/?utm_source=widget">
<img src="https://translate.jellyfin.org/widgets/jellyfin/-/jellyfin-web/multi-auto.svg" alt="Detailed Translation Status"/>
</a>

## Build Process

### Dependencies

- [Node.js](https://nodejs.org/en/download)
- npm (included in Node.js)

### Getting Started

1. Clone or download this repository.

   ```sh
   git clone https://github.com/jellyfin/jellyfin-web.git
   cd jellyfin-web
   ```

2. Install build dependencies in the project directory.

   ```sh
   npm install
   ```

3. Run the web client with webpack for local development.

   ```sh
   npm start
   ```

4. Build the client with sourcemaps available.

   ```sh
   npm run build:development
   ```

## Directory Structure

> [!NOTE]
> We are in the process of refactoring to a [new structure](https://forum.jellyfin.org/t-proposed-update-to-the-structure-of-jellyfin-web) based on [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) architecture guidelines.
> Most new code should be organized under the appropriate app directory unless it is common/shared.

```
.
└── src
    ├── apps
    │   ├── dashboard     # Admin dashboard app layout and routes
    │   ├── experimental  # New experimental app layout and routes
    │   └── stable        # Classic (stable) app layout and routes
    ├── assets            # Static assets
    ├── components        # Higher order visual components and React components
    ├── constants         # Common constant values
    ├── controllers       # Legacy page views and controllers 🧹 ❌
    ├── elements          # Basic webcomponents and React equivalents 🧹
    ├── hooks             # Custom React hooks
    ├── lib               # Reusable libraries
    │   ├── globalize     # Custom localization library
    │   ├── legacy        # Polyfills for legacy browsers
    │   ├── navdrawer     # Navigation drawer library for classic layout
    │   └── scroller      # Content scrolling library
    ├── plugins           # Client plugins
    ├── scripts           # Random assortment of visual components and utilities 🐉 ❌
    ├── strings           # Translation files (only commit changes to en-us.json)
    ├── styles            # Common app Sass stylesheets
    ├── themes            # CSS themes
    ├── types             # Common TypeScript interfaces/types
    └── utils             # Utility functions
```

- ❌ &mdash; Deprecated, do **not** create new files here
- 🧹 &mdash; Needs cleanup
- 🐉 &mdash; Serious mess (Here be dragons)


# Personal Notes
Haven't been able to work out how to connect a dev build to the Jellyfin Media Player application. Web interface works fine though!
You can run a dev build at the same time as regular Jellyfin because the ports don't conflict - 8080 for dev and 8096 for prod. This also lets you compare your build with the currently running prod one side-by-side (as long as you don't have a symlink).

To get a local version of jellyfin-web running on the server (so they share the same port and JMP will use it):
* Generate a production build of jellyfin-web `npm run build:production`
* Restart Jellyfin

That's it! A symlink between the `dist` folder and the jellyfin-web installation takes care of everything.

To make that symlink the command is `New-Item -ItemType SymbolicLink -Target "path\to\this\repo\jellyfin-web\dist" -Path "path\to\Jellyfin\Server\jellyfin-web"` in a **privileged** PowerShell window.
This works for WSL too - paths to WSL filesystems look like `\\wsl$\Ubuntu-22.04\home\username\foo`.