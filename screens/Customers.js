import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Appbar, FAB, List, TouchableRipple } from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class Customers extends React.Component {

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <View style={styles.baseContainer}>
            <Appbar.Header theme={Theme}>
              <Appbar.Content
                title='Clientes'
                style={{color: '#fff'}}
              />
            </Appbar.Header>
            <View style={styles.body}>
              <ScrollView style={styles.dynamicContent}>
                {context.state.customers.map((customer, i) => {
                  return (
                    <TouchableRipple key={customer.id} onPress={() => this.props._setView(1, customer)}>
                      <List.Item left={props => <List.Icon {...props} icon="person" />} title={customer.name} right={props => <List.Icon {...props} icon="keyboard-arrow-right" />}/>
                    </TouchableRipple>
                  );
                })}
              </ScrollView>
            </View>
            <FAB
              theme={Theme}
              style={styles.fab}
              icon="add"
              onPress={() => this.props._setView(2, null)}
            />
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  addCustomerButton: {
    color: '#596ab8'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  body: {
    padding: 10
  },
  bodyContainer: {
    height: 465 //tamaño perfecto del body, solo por si acaso, borrar al final del proyecto
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  dynamicContent: {
    backgroundColor: '#fff',
    maxHeight: 445,
    borderRadius: Theme.roundness
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  navigationBar: {
    marginBottom: 5,
  },
  contentContainer: {
    marginBottom: 20
  },
});