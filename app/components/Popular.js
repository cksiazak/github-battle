import React, { Component } from 'react';

export default class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
  }

  render() {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className="flex-center">
        {languages.map(language => (
          <li key={language}>
            <button
            style={language === this.state.selectedLanguage ? {color: 'rgb(187, 46, 31)'} : null}
              className="btn-clear nav-link"
              onClick={() => this.updateLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
