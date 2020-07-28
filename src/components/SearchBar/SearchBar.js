import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state={
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.handleTermChange=this.handleTermChange.bind(this);
        this.handleLocationChange=this.handleLocationChange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handleKeyDown=this.handleKeyDown.bind(this);

        this.sortByOptions = {
            'Best Math': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };

    }

    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption){
            return 'active';
        }
            return '';
    }

    handleSortByChange(sortByOption,event) {
        this.setState({sortBy: sortByOption});
        this.props.searchYelp(this.state.term, this.state.location,this.state.sortBy);
        this.props.loading();
        event.preventDefault();
    }

    handleTermChange(event) {
        this.setState({term: event.target.value});
    }

    handleLocationChange(event){
        this.setState({location: event.target.value});
    }

    handleSearch(event){
        this.props.searchYelp(this.state.term, this.state.location,this.state.sortBy);
        this.props.loading();
        event.preventDefault();
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li className={this.getSortByClass(sortByOptionValue)} 
            key={sortByOptionValue}
            onClick={this.handleSortByChange.bind(this,sortByOptionValue)}>
                {sortByOption}
            </li>);
        });
    }

    handleKeyDown(event){
        if (event.key === "Enter") {
        this.props.searchYelp(this.state.term, this.state.location,this.state.sortBy);
        this.props.loading();
        event.preventDefault();
        }
    }

    render() {
        return (
            <div className="SearchBar" onKeyDown={this.handleKeyDown}>
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
                    <input placeholder="Where?" onChange={this.handleLocationChange} onKeyDown={this.handleKeyDown}/>
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Let's Go</button>
                </div>
            </div>
        )
    }
};

export default SearchBar;