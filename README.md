# Running app locally
### without backend
from the project root
install dependencies ```yarn install```
execute ```yarn start```
navigate to localhost:3000 in your browser

### with backend setup
from the project root
install dependencies ```yarn install```
execute ```node server```
from another terminal session, execute ```yarn start```
navigate to localhost:3000 in your browser
requests are proxied through localhost:4000 so if testing the API directly be sure to use localhost:4000/api/*


- TODO
- editing existing blog posts verify (loads from backend, submits content and image)
- adding new projects ui
- editing existing projects ui
- session authentication/login
- draftjs RTE for submitting new posts?
- about blurb
- footer restyle?
- redirect on landing?

- deploy
