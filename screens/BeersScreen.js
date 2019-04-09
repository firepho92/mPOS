import React from 'react';
import {
  Dimensions,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Appbar, DefaultTheme, FAB, List, TouchableRipple } from 'react-native-paper';
import {PieChart} from 'react-native-chart-kit';

import AppContext from '../context/AppContext';

import Theme from './Theme';

export default class BeersScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      year: 0
    }
  }

  _renderYears = (data) => {
    let arr = [];
    for (let i = data[0].date.getFullYear(); i <= new Date().getFullYear(); i++) {
      arr.push(i);
    }
    
    return arr;
  }

  _pieData = (data) => {
    let arr = [];
    let sales = this.state.year !== 0 ? data.sales.filter(sale => sale.date.getFullYear() === this.state.year) : data.sales;
    data.beers.map(beer => {
      arr.push({name: beer.name, y: sales.filter(sale => sale.beer === beer.id).reduce((accum, sale) => accum + sale.ammount, 0), color: beer.color})
    });
    return arr;
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <View style={styles.baseContainer}>
            <Appbar.Header theme={Theme}>
              <Appbar.Content
                title='Cervezas'
                style={{color: '#fff'}}
              />
            </Appbar.Header>
            <View style={styles.body}>
              <ScrollView>
                <ScrollView style={styles.dinamicContent}>
                  {context.state.beers.map(beer => {
                    return (
                      <TouchableRipple key={beer.id} onPress={() => this.props._setView(1, beer)}>
                        <List.Item left={props => <List.Icon {...props} icon="fiber-manual-record" color={beer.color} id={beer.id}/>} title={beer.name} right={props => <List.Icon {...props} icon="keyboard-arrow-right"/>}/>
                      </TouchableRipple>
                    );
                  })}
                </ScrollView>
                <View style={styles.staticContent}>
                  <Text>Ventas general</Text>
                  <Picker
                    selectedValue={this.state.year}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({year: itemValue})
                    }>
                    <Picker.Item label='Siempre' value={0} />
                    {this._renderYears(context.state.sales).map(year => <Picker.Item key={year} label={year + ''} value={year} />)}
                  </Picker>

                  <PieChart
                    data={this._pieData(context.state)}
                    width={Dimensions.get('window').width - 40}
                    height={220}
                    chartConfig={{
                      backgroundGradientFrom: '#1E2923',
                      backgroundGradientTo: '#08130D',
                      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                      strokeWidth: 2 // optional, default 3
                    }}
                    accessor="y"
                    backgroundColor="transparent"
                    paddingLeft="15"
                  />

                </View>
              </ScrollView>
            </View>
            <FAB
              theme={Theme}
              style={styles.fab}
              icon="add"
              onPress={() => this._pieData(context.state)}
            />
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}

const textInputStyle = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b7ce5',
    accent: '#2b6aeb',
    surface: '#fff',
    background: '#fff'
  }
}

const fabTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b7ce5',
    accent: '#2b6aeb',
    surface: '#fff',
    background: '#fff'
  }
}

const styles = StyleSheet.create({
  accordions: {
    backgroundColor: '#fff'
  },
  baseContainer: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: Theme.colors.background
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  noBorder: {
    borderWidth: 0,
  },
  body: {
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 70
  },
  dinamicContent: {
    backgroundColor: '#fff',
    borderRadius: Theme.roundness,
    maxHeight: 440,
    marginBottom: 20
  },
  staticContent: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: Theme.roundness,
    marginBottom: 20
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
});
