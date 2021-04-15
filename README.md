# Local Setup

1. Clone the repo `git clone https://github,com/romanmunar/chromediaExam`, and `cd chromediaExam`.
2. Install the packages `yarn` or `npm install`.
3. Start Dev server `yarn dev` or `npm run dev`.
4. Open browser on [localhost:3000](https://localhost:3000)

# Structure

```
/
--> src
  --> components
  --> models                Typescript Types
    --> responses.ts        Api Responses as types
  --> screen                Routes Views
    --> HomeScreen.tsx      '/' View
  --> localstorage.tsx      All the crud for persisted storage
  --> utils.tsx             There's only a single function there but this is where I put static functions
  --> fetchers.tsx          Where the api calls are called using axios
  --> constants.tsx         Dial-able constants, avoids unsynchronized static vars
```
