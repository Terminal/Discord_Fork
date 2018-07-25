---
pagename: Bot card order calculations
description: The algorithm which determines the rank on Discord_Fork
---

As of the 25th July 2018, Discord_Fork operates on a "score" based system.  
The order is calculated via this piece of JavaScript.

```js
// Create a random score
item.score = Math.random();

switch(sort) {
  case 'score':
    // Even HAVING a GitHub repository is worth 1 point
    if (item.github && item.github.repo && item.github.owner) item.score += 1;
    // Each star is worth 0.02 points
    if (item.stars) item.score += item.stars * POINTS_PER_STAR;
    break;
  case 'stars':
    // Each star IS a point. No stars is no points.
    if (item.stars) item.score = item.stars || 0;
    break;
  case 'random':
    // Do not rely on stars
    break;
}
return item;
```

## Explaination
- Every bot gets a random score from 0 to 1.
- Having a GitHub repository increases your score by 1.
- Each star on the GitHub repository increases your score by 0.02.
