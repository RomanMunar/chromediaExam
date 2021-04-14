# To Chromedia

I know I didn't do well on the interview we had. Speaking is one of my worst weaknesses. As a solo freelancer, It's quite rare to have to talk with a client through video call, let alone voice call. Most of my projects were only communicated through emails. So I haven't gotten many oppurnities in developing my speaking skill. In contrast, My writing is a bit better. I've linked my [blog](https://romanmunar.netlify.app/blog) on my application a while back. Which might have been one of the reason why you've let me get an interview. I'll be thankful for the help regardless of what the outcome maybe.

Anyways, I've put in a lot of effort into making this project. I have tried to use as less libraries as possble.

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
```

# Todo

- [ ] Error handling
- [ ] Abort api calls on unmount
- [ ] Testing T.T
- [ ] Add help tooltips to filters
