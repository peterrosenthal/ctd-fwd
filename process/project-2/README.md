# Project 2 Process
## Milestone 1
### Project Overview
For this final project, we plan on doing something a little bit more lighthearted and silly. Not only does it make it something that's fun to present during an otherwise stressful finals time, but it also makes it a lot easier to work on too, the silly vibe can really reduce the pressure of the project for everyone which is nice. So the silly thing that we want to create is a little game/game-like experience called *Lancelot*. *Lancelot* is a dating app for monsters, mages, and all things mythical!
We want to start with just focusing on the profile creation experience. If we really have the time then we would love to take the project even further, but we want to keep the project responsibly scoped so that we don't overwhelm ourselves.

### Content Sources
We aren't really planning on using any outside content for this project. We might have to source some images from the internet to speed up the development process. But other than that, the rest of the project is going to be 100% birthed out of our own creativity. And even the images is something that we'd love to create ourselves if we end up having time to!

### Visual Design: Mockup/Wireframe
![The landing page/first view of our app, character selection.](project-2-milestone-1-first-view.png)
![The "filling out a profile" screen in our app, is the second view, following character selection.](project-2-milestone-1-profile-view.png)
Our mockups for this project shows two separate "pages" but we are creating a single page application, so these should actually be thought of more as two separate "views" of the application. We shouldn't need to do any routing or anything special, because the user should never even need to navigate back and forth between the views: they are sequential views, not parallel. The first view has only one choice that needs to be made, and then the second view will load upon the completion of that choice (different versions of the second view are loaded depending on what choice was made in the first view). The first view is where the user select's their character for this game-like experience. In our mockup we are giving the user a choice between "Dirk Dragon," "Yandrew Yeti," and "Gertrude Gnome" as their characters, our goal by the end is to have designed a bunch of different characters, and randomly select 3-4 from the list to let the player chose from at this stage. Then once a character is chosen, the player moves on to the second view of the little game-like experience where they "fill out" their dating profile. Like mentioned in the project overview, we want to throw some light quips at social media/dating apps in there while where at it, and so rather than pressuring the user to come up with creative dating profiles themselves: we will have them merely pretend to fill out the profile, but instead fill it out with our own predetermined content for the user to read and laugh at.

### Team Members
For this project, Bella Colosimo and I are partnering up. We never really worked together when we were undergrads in the ATLAS program, but then since we both moved onto the graduate program, we've worked together a lot, because we've been able to leverage our shared past and combined knowledge. We form a pretty consistent/predictable team, and we know well how we work with each other because we've done it numerous times in the past by now. We don't usually dictate out any roles or leadership on our team, and we both often times have a lot of overlap in what we do... which is everything, so we kind of both do everything together, from both the design and production stand point. I do have slightly more experience in coding and Bella has more experience in design, so we do have our respective strengths and weaknesses that we can play to, but I have found in the past that the two of us tend to rely more on direct collaboration than we do on dividing and conquering.

## Milestone 2
### MVP
Our minimum viable product for this project is just the introductory "choose a profile" screen (what I call first view), and the intermediate "fill out the profile" screen (what I call second view). These two views should have no need to navigate between them as they are sequential in the experience, so no routing is required as part of the MVP. There are ways that we would like to expand beyond the MVP if we end up with time: we could add a third and final view to the experience where the player finally chooses between potential suitors and is given random matches over time. But to avoid over-scoping the project and making it too hard on ourselves, we don't want to count on adding that third view to the experience in our MVP, rather we just hope that we'll have the extra time to get it done in the end.

### Component Hierarchy
![The component hierarchy for the first view of the MVP.](component-hierarchy-first-view.png)
![The component hierarchy for the second view of the MVP.](component-hierarchy-second-view.png)

This is/these are the component hierarchy(s) that we started designing based off of. Since starting the development process, we've renamed `Header` to `Title` (for no reason other than I'm picky), and added a `ProfilesList` component to the first view, which surrounds the list of `ProfileCard`s. The `Container`, and `ProfileCard` are reused accross both views.

### Static App
We created 2 static apps to represent the 2 separate views that will be present in our 1 final app. The first view can be found at https://creative.colorado.edu/~pero7021/fwd/projects/milestone2/project2/first-view/, and the second view can be found at https://creative.colorado.edu/~pero7021/fwd/projects/milestone2/project2/second-view/.

![A screenshot from the first view of our static app.](static-app-first-view.png)
![A screenshot from the first view of our static app.](static-app-second-view.png)

Code for the static apps can be found at https://gitlab.com/peter-and-bella-web-dev/project-2/-/tree/main/static/first-view and https://gitlab.com/peter-and-bella-web-dev/project-2/-/tree/main/static/second-view.

### Minimal State Representation
In our application, we have the following pieces of data:

- The container that contains different components 
- Profile cards, allowing the user to select their chosen character
- Profile information, allowing the user to “fill in” pre-selected text on their keyboard 

According to the Thinking in React template, we then have to ask three questions about each piece of data. 

1. Is it passed in from a parent via props?
2. Does it remain unchanged over time?
3. Can you compute it based on any other state or props in your component? 

The homepage remains unchanged over time, so that is not state. The profile card selection seems to be state because it changes depending on user choice and can’t be computed from anything. And finally the profile information isn’t state because it is computed based on what profile the user selects. 

So our state is:

- Whether or not a profile card has been selected yet (this determines whether the first or second view is shown)
- The profile card which has been selected (this determines what information is shown during the second view)
- Whether or not the person is typing (this is the action that causes profile information to fill out during the second view)

### Team Members
For this project, Bella Colosimo and I are partnering up. We have a lot of experience as partners in the past, and we have relatively similar skillsets, so we prefer to leverage our combined knowledge rather than divide and conquer. Nonetheless, a little bit of divide and conquer has to happen to get the project done with our varying schedules. A very not strict breakdown would be as follows: Bella would mostly take responsibility for creating the static app (milestone 2), and the visual design of the project, though Peter has they're hands in both of those things as well, and Peter would take responsibility for adding state and reactivity to the application, and the possibility of expanding the application beyond the MVP, though Bella has her hands in all of those things as well too.

## Milestone 4
From a technical standpoint, I felt like this project went really smoothly. There weren't any developmental hiccups at all. I think that the timeline of the project really helped that be the case, especially having a completed static application by before Thanksiving break. That was definitely stressful trying to finish that up at the same time as the extra project for graduate students, but once it was finished up, the entire rest of the development process was super stress free.

From a creative standpoint, I'm super pleased with the project. Not only was it a unique and fun idea, but I (and Bella) had a bunch of fun while working on it because it was such a creatively funny project. I feel like when I'm working alone, I always keep the scope of my project a little too serious, cause that feels good and practical. But then I always end up not having as much fun while working on the project (as evidenced by how much more enjoyable this project was for me compared to usual). So I'm very grateful for Bella steering me in the right creative direction this project.

And finally from a groupwork standpoint, this project far exceeded my expectations! In my previous milstones on this project I was constantly talking up how well Bella and I work together, but I honestly wasn't really talking it up for anyone except myself to convince myself it'd all go fine. Usually I strongly dislike group projects, because the added layer of organizational effort usually makes development harder, longer, and more painful than it needs to be. But none of that was the case this time! Bella and I were able to work so efficiently in class together, that there was really minimal out-of-class work on the project, which meant that the extra organizational effort required to do a group project was so small it was barely there. I think another important factor to the group work part of the project going well was the fact that I feel when I work with Bella, I don't have to comprimise my creative vision whatsoever. Our experience working together in groups in the past means that we know where to step to avoid each other's toes, and we are also really good at "yes and"ing each other in the creative process instead of "no but," which can be frustrating to be on the other end of.

All in all, I felt great about this project, and I wouldn't change a thing! Which isn't something I can usually say about final projects around this time of the year. Usually the stress of a project means I grow to resent it, but I'm pleased to say that's not the case this time :)
