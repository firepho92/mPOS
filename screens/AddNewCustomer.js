import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Appbar, DefaultTheme, Subheading, TextInput } from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class AddNewCustomer extends React.Component {

  state = {
    name: '',
    phone: '',
    address: ''
  }

  _handleInputChange = (value, inputName) => {
    this.setState({
      [inputName]:value
    });
  }

  _submitData = (addCustomer, showAlert) => {
    if(addCustomer(this.state.name, this.state.phone, this.state.address)) {
      showAlert('Agregado correctamente');
      this.props._setView(0, null)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <AppContext.Consumer>
          {context => (
            <View style={styles.baseContainer}>
              <Appbar.Header theme={Theme}>
                <Appbar.BackAction
                  onPress={() => this.props._setView(0, null)}
                />
                <Appbar.Content
                  title="Agregar nuevo cliente"
                />
              </Appbar.Header>
              <ScrollView style={styles.body}>
                <View style={styles.staticContent}>
                  <Subheading>Ingresa los siguientes datos</Subheading>
                  <TextInput
                    label="Nombre"
                    value={this.props.name === undefined ? this.state.name : this.props.undefined}
                    onChangeText={value => this._handleInputChange(value, 'name')}
                    theme={textInputStyle}
                    mode="outlined"
                    returnKeyType = { "next" }
                    onSubmitEditing={() => { this.phoneTextInput.focus(); }}
                  />
                  <TextInput
                    label="Teléfono"
                    value={this.props.phone === undefined ? this.state.phone : this.props.phone}
                    onChangeText={value => this._handleInputChange(value, 'phone')}
                    theme={textInputStyle}
                    mode="outlined"
                    returnKeyType = { "next" }
                    onSubmitEditing={() => { this.addressTextInput.focus(); }}
                    ref={(input) => { this.phoneTextInput = input; }}
                  />
                  <TextInput
                    label="Dirección"
                    value={this.props.address === undefined ? this.state.address : this.props.address}
                    onChangeText={value => this._handleInputChange(value, 'address')}
                    theme={textInputStyle}
                    mode="outlined"
                    ref={(input) => { this.addressTextInput = input; }}
                  />
                  <View style={{borderRadius: 10, marginTop: 20}}>
                    <Button
                      color={Theme.colors.accent}
                      onPress={() => this._submitData(context.addCustomer, context.showAlert)}
                      title="Agregar"
                      style={{width: 30}}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
        </AppContext.Consumer>
      </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  accordions: {
    backgroundColor: '#fff'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  body: {
    padding: 10
  },
  staticContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: Theme.roundness
  }
});