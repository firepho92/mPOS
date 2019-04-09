import React, {Component} from 'react';

import AppContext from './AppContext';

import DocumentIO from '../models/documentIO';
import Customer from '../models/customer';

import data from './data';

let documentIO = new DocumentIO();

class ContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            sales: [],
            deposits: [],
            beers: [],
            customers: [],
            alert: {
                visible: false,
                msg: ''
            }
        }
    }

    componentDidMount() {
        //this.readData();
        this.setState({
            beers: data.beers,
            customers: data.customers,
            deposits: data.deposits,
            sales: data.sales
        })
    }

    //customers
    addCustomer = async (name, phone, address) => {
        let customer = new Customer(name, phone, address);        
        this.setState(prevState => ({
            customers: [...prevState.customers, customer.customer]
        }));
        return true;
    }

    deleteCustomer = async (customer_id) => {
        let customers = this.state.customers;
        let index = this.state.customers.map((customer, index) => {
            if(customer.id === customer_id) {
                return index;
            }
        }).filter(isFinite);
        customers.splice(index, 1);
        this.setState({
            customers: customers
        });
        return true;
    }

    //beers
    addBeer = async (beer) => {
        this.setState(prevState => ({
            beers: [...prevState.beers, beer]
        }));
    }

    //sales
    addSale = (sales) => {
        let response;
        let beers = this.state.beers;
        response = sales.map(sale => {
          return response = beers.map(beer => {
            if(sale.beer === beer.id) {
              if (sale.ammount <= beer.stock) {
                beer.stock -= sale.ammount;
                this.setState(prevState => ({
                    sales: [...prevState.sales, sales]
                }));
                this.showAlert('Venta exitosa.');
                return true;
              } else {
                this.showAlert(`No hay suficientes ${beer.name}s en stock.`);
                return false;
              }
            }
          });
        });
        return response;
    }

    showAlert = (msg) => {
        this.setState({
            alert: {
                visible: true,
                msg: msg
            }
        });
    }

    hideAlert = () => {
        this.setState({
            alert: {
                visible: false,
                msg: ''
            }
        });
    }

    storeData = async () => {
        let result = await documentIO.writeDocument(this.state);
        console.log(result);
    }

    readData = async () => {
        let result = await documentIO.readDocument();
        result = JSON.parse(result);
        this.setState(result);
    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                storeData: this.storeData,
                readData: this.readData,
                addCustomer: this.addCustomer,
                deleteCustomer: this.deleteCustomer,
                addBeer: this.addBeer,
                addSale: this.addSale,
                showAlert: this.showAlert,
                hideAlert: this.hideAlert
            }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default ContextProvider;