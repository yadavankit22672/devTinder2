#DevTinder APIs

authRouter

- POST /signup
- POST /log in
- POST /logout

profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // forgot password api

connectionRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/send/:status/:userId

- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

feedRouter

- GET /user/requests/recieved
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignored , interested, accepted , rejected
