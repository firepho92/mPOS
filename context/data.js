import ObjectId from '../utils/id_generator';
export default data = {
  colors: [
    '#FF1744',
    '#F50057',
    '#D500F9',
    '#651FFF',
    '#3D5AFE',
    '#2979FF',
    '#00B0FF',
    '#00E5FF',
    '#1DE9B6',
    '#00E676',
    '#76FF03',
    '#C6FF00',
    '#FFEA00',
    '#FFC400',
    '#FF9100',
    '#FF3D00',
    '#8D6E63',
    '#BDBDBD',
    '#78909C'

  ],
  beers: [
    {
      id: 1,
      name: 'Diablo',
      style: 'Red Ale',
      selling_price: 35,
      cost_price: 25,
      stock: 100,
      color: '#FF1744',
      status: true
    },
    {
      id: 2,
      name: 'Tritón',
      style: 'American Pale Ale',
      selling_price: 35,
      cost_price: 25,
      stock: 100,
      color: '#FFC400',
      status: true
    },
    {
      id: 3,
      name: 'Porter',
      style: 'Porter',
      selling_price: 35,
      cost_price: 25,
      stock: 100,
      color: '#00B0FF',
      status: true
    },
    {
      id: 4,
      name: 'Blonde Ale',
      style: 'Blonde Ale',
      selling_price: 35,
      cost_price: 25,
      stock: 100,
      color: '#FFEA00',
      status: true
    },
    {
      id: 5,
      name: 'Tiburón Imperial',
      style: 'Imperial Stout',
      selling_price: 35,
      cost_price: 25,
      stock: 100,
      color: '#78909C',
      status: true
    },
],
customers: [
    {
        id: 1,
        name: 'Vidita Mia',
        phone: '555-1234', 
        address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
        status: true
    },
    {
        id: 2,
        name: 'Tiendita',
        phone: '555-1234',
        address: 'Alguno',
        status: true
    },
],
sales: [
  {
    id: ObjectId(),
    date: new Date(2019, 0, 24),
    customer: 1,
    beer: 1,
    ammount: 10
  },
  {
    id: ObjectId(),
    date: new Date(2019, 0, 24),
    customer: 1,
    beer: 2,
    ammount: 6
  },
  {
    id: ObjectId(),
    date: new Date(2019, 0, 24),
    customer: 1,
    beer: 3,
    ammount: 25
  },
  {
    id: ObjectId(),
    date: new Date(2019, 0, 24),
    customer: 1,
    beer: 4,
    ammount: 1
  },
  {
    id: ObjectId(),
    date: new Date(2019, 1, 24),
    customer: 1,
    beer: 5,
    ammount: 6
  },
  {
    id: ObjectId(),
    date: new Date(2019, 1, 24),
    customer: 2,
    beer: 1,
    ammount: 10
  },
],
deposits: [
  {
    id: ObjectId(),
    date: new Date(),
    customer: 1,
    ammount: 100
  }
]

}