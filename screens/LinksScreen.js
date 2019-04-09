import React, {Fragment} from 'react';

import BeersScreen from './BeersScreen';
import BeerScreen from './BeerScreen';

import AppContext from '../context/AppContext';

export default class LinksScreen extends React.Component {
constructor() {
    super();
    this.state = {
      view: 0,
      beer: null
    }
  }

  static navigationOptions = {
    header: null,
  };

  _setView = (view, beer) => {
    this.setState({
      beer: beer,
      view: view
    });
  }
  
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Fragment>
            {this.state.view === 0 ? <BeersScreen _setView={this._setView}/> : null}
            {this.state.view === 1 ? <BeerScreen beer={this.state.beer} sales={context.state.sales.filter(sale => sale.beer === this.state.beer.id)} _setView={this._setView}/> : null}
          </Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}