## Smartfoundry todo app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 18.0.0

Minimum

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

#### Yarn

```bash
npm i -g yarn
```

### Installing

Below is a series of step by step instructions that tell you how to get a development env running.

Create a local clone of the repository

```bash

git clone git@github.com:cosmas28/smartfoundry-todo.git

```

Enter the cloned repositories' directory

```bash

cd smartfoundry-todo

```

Install the projects dependencies

```bash
yarn
```

Start the projects development server

```bash
yarn dev
```
														|

## Built With

Details of the tech stack that has been used.

- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [React](https://reactjs.org/) - Client Framework
- [Vite](https://vitejs.dev/) - Frontend Tooling

## Authors

- **Cosmas Augostino** <cosmas.augostino@gmail.com>

## Licenses

Place the result of `npx license-checker --summary` here

```
├─ MIT: 296
├─ ISC: 6
├─ Apache-2.0: 4
├─ BSD-3-Clause: 4
├─ 0BSD: 2
├─ BSD-2-Clause: 2
├─ UNLICENSED: 1
├─ CC-BY-4.0: 1
├─ W3C: 1
└─ BSD: 1
```

