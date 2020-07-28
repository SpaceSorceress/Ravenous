const apiKey = "jizCJqbjvsoMTx4y31TLBFBZWosAbHRuQnJwsp_3EJ9WA40Ma_Q2E3-0KdGI8G3emqP_m8WlPDD8WPVsOc67U6ptoroZwVqjzK3K9773CJ4Zuoc8OPkH6LabOPzEXnYx";
const Yelp = {

    search(term, location, sortBy) {
        let yelpLink = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;//&limit=20
        let corsLink = `https://cors-anywhere.herokuapp.com/`;
        let path = `${corsLink}${yelpLink}`;
        const browserHeader = {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        };
        //fetch will return a promise
        return fetch(path, browserHeader)
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => ({
                        id: business["id"],
                        imageSrc: business["image_url"],
                        name: business["name"],
                        address: business["location"]["address1"],
                        city: business["location"]["city"],
                        state: business["location"]["state"],
                        zipCode: business["location"]["zip_code"],
                        category: business["categories"][0]["title"],
                        rating: business["rating"],
                        reviewCount: business["review_count"],
                        url:business.url
                    }));
                }else{return "Your search was unsucessful. Please try again"}
            });
    }
};



export default Yelp;