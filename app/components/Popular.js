import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            className="btn-clear nav-link"
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export default class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  // update the dom by fetching what the default state of language is
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }
  
  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null
    });

    fetchPopularRepos(selectedLanguage)
      .then(repos =>
        this.setState({
          repos,
          error: null
        })
      )
      .catch(() => {
        console.warn('Error fetching repos: ', error);
        this.setState({
          error: 'There was an error fetching the repositories'
        });
      });
  }

  //If there are no repos or errors, return true for loading
  isLoading() {
    return this.state.repos === null && this.state.error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    );
  }
}
