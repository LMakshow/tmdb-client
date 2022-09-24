import React from 'react';

interface State {
  searchQuery: string;
}

export default class Search extends React.Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') as string,
    };
  }

  componentSaveStorage() {
    localStorage.setItem('searchQuery', this.state.searchQuery);
  }

  componentDidMount() {
    if (localStorage.getItem('searchQuery'))
      this.setState({ searchQuery: localStorage.getItem('searchQuery') as string });
    window.addEventListener('beforeunload', () => this.componentSaveStorage());
  }

  componentWillUnmount() {
    this.componentSaveStorage();
  }

  render() {
    return (
      <div className="search-container">
        <div className="search-field">
          <input
            className="search-box"
            type="search"
            placeholder="Search"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            onChange={(event) => {
              this.setState({ searchQuery: String(event.currentTarget.value) });
            }}
          />
          <div className="search-clear"></div>
        </div>
      </div>
    );
  }
}
