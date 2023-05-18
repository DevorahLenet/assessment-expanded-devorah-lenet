 
Still missing from the spec: "growth" column, "style" column, and accurante individual links to each distinct plant's page.
This is because the only (free) route to get the growth, style and url of a plant was the individual "getById" route, 
which means that the program would have to call the API an additional 300+ times just to get that information. Since the rate limit on
the free plan is 2 requests per second, that's not feasible. (Theoretically one could time a delay between each two requests, 
resulting in a very long page loading time. I was unable to find a reasonable way to implement this.)
