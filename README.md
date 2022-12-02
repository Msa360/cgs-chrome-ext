# CGS chrome extension
### Use CGS to override existing reservation of csfoy gym.

The CGS extension is based on an unpatched vulnerability of the csfoy gym website. The website uses an api to register gym reservations. Althought the server has some security checks before accepting the reservation, it contains a security hole allowing anyone to make a post request to the website's api and modify other reservations.

### How It works?

The csfoy gym website uses php as its backend. It is easily detectable by the extension of its files or because of the generation of the PHPSESSIONID cookie. After analysing the requests made by the webpage when a reservation is updated, one can obsverve that their API is using a certain UserID. The vulnerability lies in this UserID. When a post request is made to the url to update a reservation, the post request needs to have a conected PHPSESSIONID cookie, and a form-data containing the reservation details (ex: time and day) and also the UserID. The time and day must be valid and one cannot include a time that is already outdated, so they are verified by the server. The UserID althought isn't verified. The server doesn't verify if the included UserID matches the UserID assoiated with the PHPSESSIONID cookie. So one can just put it's own UserID or another random UserID (ex: a number around 10 000). 
