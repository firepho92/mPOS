import React from 'react';

import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

import AppContext from '../context/AppContext';

import Theme from './Theme';

export default class DefineQuantity extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: ''
    }
  }

  _handleInputChange = (value) => {
    parseInt(value, 10);
    this.setState({
      quantity:value
    });
  }

  _handleSubmit = (_addItemToCart, showAlert) => {
    if(_addItemToCart){
      showAlert('Elementos agregados correctamente.');
      this.setState({
        quantity: ''
      });
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Portal>
            <Dialog
              visible={this.props.visible}
              onDismiss={this.props._hideQuantityDialog}>
              <Dialog.Title>Cantidad de cervezas a vender</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  autoFocus={true}
                  mode="outlined"
                  label="Cantidad"
                  value={this.state.quantity}
                  keyboardType="number-pad"
                  theme={Theme}
                  onChangeText={text => this._handleInputChange(text)}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => this._handleSubmit(this.props._addItemToCart(this.props.beer_id, this.state.quantity), context.showAlert)} theme={Theme}>Agregar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </AppContext.Consumer>
    );
  }
}

