import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
    render() {
        return (
            <div className="BusinessList">
                {   this.props.businesses!=="Your search was unsucessful. Please try again"?
                    this.props.businesses.map(business => {
                        return <Business business={business} key={business.id}/>
                    }): (
                          <div>
                            <h1>We are sorry, but your search was unsucessful.</h1>
                            <h2>It looks like you had a typo or we don't cover the area yet.</h2>
                            <h2>Please try again.</h2>
                         </div> )
                }
            </div>
        );
    }
}

export default BusinessList;