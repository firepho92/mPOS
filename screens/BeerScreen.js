
import React from 'react';

import {Dimensions, Picker, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Appbar, FAB, List, TouchableRipple} from 'react-native-paper';
import {VictoryArea, VictoryChart, VictoryTheme} from 'victory-native';
import {LineChart} from 'react-native-chart-kit';

import Theme from './Theme';

export default class BeerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      year: new Date().getFullYear()
    }
  }

  _renderYears = (data) => {
    let arr = [];
    for (let i = data[0].date.getFullYear(); i <= new Date().getFullYear(); i++) {
      arr.push(i);
    }
    
    return arr;
  }

  _getDataSet = () => {
    let arr = [];
    for(let i = 0; i < 12; i++) {
      arr.push(this.props.sales.filter(sale => sale.date.getFullYear() === this.state.year && sale.date.getMonth() === i).reduce((accum, sale) => accum + sale.ammount, 0));
    }
    return arr;
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        <Appbar.Header theme={Theme}>
          <Appbar.BackAction
            onPress={() => this.props._setView(0, null)}
          />
          <Appbar.Content
            title={this.props.beer.name}
            style={{color: '#fff'}}
          />
        </Appbar.Header>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.content}>
              <Text style={{fontSize: 20}}>
                Propiedades de la cerveza
              </Text>
              <Text>
                Nombre: {this.props.beer.name}
              </Text>
              <Text>
                Estilo: {this.props.beer.style}
              </Text>
              <Text>
                Precio de venta: {this.props.beer.selling_price}
              </Text>
              <Text>
                Precio de costo: {this.props.beer.cost_price}
              </Text>
              <Text>
                Stock: {this.props.beer.stock}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Color: </Text><View style={{borderRadius: 10, height: 20, width: 20, backgroundColor: this.props.beer.color}}></View>
              </View>
            </View>
            <View style={styles.content}>
              <Picker
                selectedValue={this.state.year}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({year: itemValue})
                }>
                {this._renderYears(this.props.sales).map(year => <Picker.Item key={year} label={year + ''} value={year} />)}
              </Picker>

              <LineChart
                data={{
                  labels: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                  datasets: [{
                    data: [...this._getDataSet()]
                  }]
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  strokeWidth: 2 // optional, default 3
                }}
                bezier
              />
              
              
            </View>
          </ScrollView>
        </View>
        <FAB
          theme={Theme}
          style={styles.fab}
          icon="edit"
          onPress={() => this._getDataSet()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accordions: {
    backgroundColor: '#fff'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingBottom: 10,
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
  content: {
    backgroundColor: '#fff',
    borderRadius: Theme.roundness,
    padding: 10,
    marginBottom: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
});