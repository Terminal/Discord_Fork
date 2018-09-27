---
pagename: Bot card order calculations
description: The algorithm which determines the rank on Discord_Fork
---

As of the 2nd August 2018, Discord_Fork operates on a "score" based system.  
The order is calculated via this piece of JavaScript.

```js
// Create a random score between 0 and 1 point
let calculatedScore = Math.random();

if (listItem.github && listItem.github.repo && listItem.github.owner) {
  // If there's a GitHub repo, add 1 point.
  calculatedScore += 1;
}

// For every magnitude of 10 stars, add 0.5 points
// 1 star = 0 points
// 10 stars = 0.5 points
// 100 stars = 1 point
// 1000 stars = 1.5 points
if (data.data.stargazers_count) {
  itemCard.dataset.stars = data.data.stargazers_count;
  calculatedScore += Math.log10(data.data.stargazers_count || 1) * 0.5;
}

// For any licence, add 0.2 points.
if (data.data.license && data.data.license.spdx_id) {
  itemCard.dataset.licence = data.data.license.spdx_id;
  calculatedScore += 0.2;
}
```

## Explaination
- Every bot gets a random score from 0 to 1.
- Having a GitHub repository increases your score by 1.
- Each star on the GitHub repository increases your score by 0.02.
