# CGS chrome extension
## Use CGS to override existing reservation of csfoy gym.

The CGS extension is based on an unpatched vulnerability of the csfoy gym website. The website uses an api to register gym reservations. Althought the server has some security checks before accepting the reservation, it contains a security hole allowing anyone to make post request to the website api to modify other reservations.