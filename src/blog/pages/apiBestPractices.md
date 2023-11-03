# Why API "Best Practices" are Sometimes Counterproductive

Sometimes it's really easy to fall into the trap of reading an article on "best practices" for a certain system and instantly deciding you MUST implement it. Backends and APIs are made for clients, and the majority of backends only have one client — the frontend application.

For public APIs, it makes sense to handle your resources using the REST pattern. This way, every client that uses your API will be able to access the data they need in one way or another. However, for backend APIs that serve a single frontend application, your backend should serve your frontend. Sometimes REST isn't the best option, even though it's considered a "best practice". Please keep in mind that the rest of this post is referring to APIs that serve a single client, not for public APIs that have to serve lots of different clients with lots of different applications.

## The Pitfall of "Best Practices"

A one-size-fits-all solution rarely exists for any system, and APIs are the same. I looked up ["API best practices"](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/), and the first Google result is an example of what I'm talking about. In this [SOF blog post](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/), the author defines a list of API "best practices" as a one-size-fits-all solution to creating APIs. I've come up with a list of some of the most common items I've seen based on a few Google search results:

- Accept and Respond in JSON
- Don't couple your response data to your UI
- Prefer generic endpoints over specific ones

While in general, these are good ideas and make it easy to maintain your API, it's really think of scenarios in which these aren't the most effective way of building your APIs.

### Managing Your Responses

A great example of how these "best practices" can negatively affect your APIs is when you consider how you have to parse information. If I'm making a GET request to my server to load a bunch of previews for blog posts, I'm expecting to recieve some JSON from the backend, probably in a format similar to this:

```json
{
    "posts": [
        {
            "author": "bo",
            "date": "8/30/2023",
            "title": "Oversharing JSON",
            "slug": "oversharing-json"
        },
        {
            "author": "tommy",
            "date": "8/29/2023",
            "title": "My Cats are Orange and Small",
            "slug": "orange-cats"
        }
    ]
}
```

This looks great! It would be very easy for me to take this data and map each post entry to some React component in my UI. However, this becomes an issue the second I decide I want to change what the previews look like. For example, what if I want to add an image? Or what if I want to add the number of views a post has? Now, I have to modify the backend API endpoint and the frontend post component that parses the data.

This is especially an issue if I'm working in Swift or Java native code for iOS or Android apps, as I would have to submit an entire app bundle update to the App Store or to the Google Play store, wait for them to review it, and a week later my update can go live. (This isn't as much of an issue with a framework support OTA updates like React Native, Flutter, or whatever [Facebook Messenger](https://engineering.fb.com/2023/02/06/ios/facebook-ios-app-architecture/) has going on)

A much better system is one that has already existed for a while: sending HTML responses. Why bother having to parse JSON data and store every possible configuration of your frontend (including ones you don't even know you need yet) when instead you could have your backend send you raw HTML to inject into your UI? Doing this is much more efficient for your frontend, doesn't require you to constantly update your app bundles, and decreases your overall bundle size.

### It's Okay to Couple Your Data

Another comment that people have is that you shouldn't couple your frontend and backend data — everything should be separated. As usual, this is __great__ advice for public APIs. However, when your backend API supports one client, your frontend, then why not make it easier for your frontend developers?

For example, if I'm loading two tables in my UI, these are the two methods that I could use:

#### Method 1

1. Query the database in the backend using a JOIN command
2. Sort and permute the data
3. Send the data to the frontend as JSON
4. Take the array of data, filter it into two arrays, and sort it
5. Map the two arrays into my two custom table components
6. Render the components in the UI

![method 1](/blog/apiBestPractices/method-1.png)

#### Method 2

1. Query the database in the backend
2. Sort and permute the data into my table components
3. Send the data to the frontend
4. Render the raw response as HTML in the UI

![method 1](/blog/apiBestPractices/method-2.png)

While method 2 has slightly more permutation, the overhead is not much in comparison to the amount of code complexity that is saved. Of course, this is an engineering trade off, and as always there isn't a one-size-fits-all system. That being said, unless there's a UI element that I'm constantly rendering over and over, that I'm sure will never change, I'm probably always going to prefer sending prebuilt HTML over JSON + parsing.

### Generic Endpoints can Cause Unecessary Complexity and Oversharing JSON Data

Another issue that I've come across, and I'm sure many other engineers have come across, is the struggle of having to chain complex async functions together to get the data you need. For example, on one of my recent projects that involved social feeds this was the procedure:

1. Query for the user's friends
2. Query for 20 recent posts with authors that are friends
3. Query for the friends profiles
4. Query for interactions (likes and comments)

![flow](/blog/apiBestPractices/flow.png)

This resulted in very inefficient frontend code, slow load times, and 4 separate requests to the backend (not good!). On top of that, each of the 4 requests contained either duplicate information or unecessary information. Specifically, I was using this data to show post previews, but I was getting the entire post information, the full list of comments and likes, and __all__ of the user data (user ID, email, profile picture, bio, etc).

Not only was this method slow, but it also resulted in unecessary bandwidth being used by our server. When I talked to my backend engineers about this, they saw how this was an issue that could cause load issues in the future, and agreed that it needed a solution. To fix it, we added one custom endpoint "/feed" to our backend API, decreasing the load time by 85%+.

Issues like these are really common in frontend applications, and typically the main reason for them is the appearance of immutability on the backend API. However, because your backend's job is to serve your frontend, solutions like custom endpoints that do multiple jobs are sometimes okay, and sometimes make your backend more efficient (and therefore more cost effective!).

## Conclusion

While "best practices" are great for public APIs, and can make your code more accessible for all of your users/clients, a majority of APIs are not public, and only serve one client. Because of this, your private APIs should do their job as good as possible, and serve the frontend as best as they can. I'm going to once again say that there is no one-size-fits-all, and the things I talk about in this post aren't necessarily issues or solutions for everyone, but in general it's a very good idea to always think about the context of your systems before blindly subscribing to someone else's "best practices."

![api default](/blog/apiBestPractices/api-default.png)
