import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./Styles/App.css";
import Layout from "./Components/Layout/Layout";
import Cart from "./Components/Cart";
import Order from "./Components/Order";
import History from "./Components/History";
import { waitForDomChange } from "@testing-library/react";

class App extends React.Component {
  //Gonna have to create MongoDB database for dynamic products
  state = {
    Items: [
      { name: "Apples", quantity: 0 },
      { name: "Peaches", quantity: 0 },
      { name: "Corn", quantity: 0 },
      { name: "Black Beans", quantity: 0 },
      { name: "Chicken", quantity: 0 },
      { name: "Pork", quantity: 0 },
      { name: "Bread Loaf", quantity: 0 },
      { name: "Rice", quantity: 0 },
      { name: "Knuckle Sandwich", quantity: 0 },
    ],
    OrderHistory: [],
    NewProduct: "",
  };

  componentDidMount() {
    this.handleGetOrdersFromDB();
  }

  componentWillUnmount() {
    this.handleGetOrdersFromDB();
  }

  render() {
    let orderItems = (
      <div>
        {this.state.Items.map((item, index) => {
          return (
            <Order
              itemName={item.name}
              quantity={item.quantity}
              key={index}
              changed={(event) => this.handleChangeCart(event, index)}
            />
          );
        })}
      </div>
    );

    let cartItems = this.state.Items.map((item, index) => {
      return <Cart name={item.name} quantity={item.quantity} key={index} />;
    });

    return (
      <div className="App">
        <Layout>
          <div className="row">
            <div className="top-left col">
              {orderItems}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(event) => this.handleSubmitButton(event)}
              >
                Order
              </button>
              <br />
              <div className="Add-Remove-Product">
                <input
                  className="Product-Change"
                  type="text"
                  onChange={(e) => this.handleChangeNewProduct(e.target.value)}
                />
                <button
                  type="submit"
                  className="Add-Button"
                  onClick={(event) => this.handleAddItemToList(event)}
                >
                  Add Product
                </button>
                <button
                  type="submit"
                  className="Remove-Button"
                  onClick={(event) => this.handleRemoveItemFromList(event)}
                >
                  Remove Product
                </button>
              </div>
            </div>

            <div className="top-right col">
              <div className="text-right">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>{cartItems}</tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bottom">
              <History
                items={this.state.Items}
                orders={this.state.OrderHistory}
                handleDeleteOrder={this.handleDeleteOrder}
              />
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  handleChangeCart = (event, index: number) => {
    const { id, value } = event.target;
    if (value < 0) return; //doesn't allow negative inputs
    var changeItem = { name: id, quantity: parseInt(value) };
    const newArr = [
      ...this.state.Items.map((item, index2) => {
        return index2 === index ? changeItem : item;
      }),
    ];
    this.setState({ Items: newArr });
  };

  handleChangeNewProduct = (value: string) => {
    this.setState({ NewProduct: value });
  };

  handleSubmitButton = (event) => {
    this.handleAddOrderToDB(); // send to Database

    const order: Object[] = [...this.state.Items];
    const newOrderHistory = [...this.state.OrderHistory, order];

    const resetItems = this.state.Items.map((item) => {
      return { name: item.name, quantity: 0 };
    });

    this.setState({
      OrderHistory: newOrderHistory,
      Items: resetItems,
    });
  };

  /*
   * Function meant to add a new product to Items
   * list. Will delete all local and DB orders to
   * preserve Order History formatting.
   */
  handleAddItemToList = (event) => {
    //Add to Items (local); Delete OrderHistory (local)
    const newProductItem = {
      name: this.state.NewProduct,
      quantity: 0,
    };
    this.setState({
      Items: [...this.state.Items, newProductItem],
      OrderHistory: [],
    });

    //Calls deleteAll api call
    fetch("http://localhost:5000/api/delete/all", {
      method: "DELETE",
    });
  };

  /*
   * Function meant to remove an existing product
   * from Items list. Will delete all local and DB
   * orders to preserve Order History formatting.
   */
  handleRemoveItemFromList = (event) => {
    //Remove from Items (local); Delete OrderHistory (local)
    let items = this.state.Items.filter((item) => {
      if (item.name !== this.state.NewProduct) return item;
    });
    this.setState({
      Items: items,
      OrderHistory: [],
    });

    //Calls deleteAll api call
    fetch("http://localhost:5000/api/delete/all", {
      method: "DELETE",
    });
  };

  handleGetOrdersFromDB = () => {
    let responseData;
    fetch("http://localhost:5000/api/orders", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
        console.log(data);

        let ordersArray: any[] = [];
        data.forEach((order) => {
          let orderArray: Object[] = [];
          for (var key in order) {
            //if(key === '_id') continue;

            orderArray.push({
              name: key,
              quantity: order[key],
            });
          }
          ordersArray.push(orderArray);
        });
        console.log(ordersArray);
        this.setState({ OrderHistory: ordersArray });
      });
  };

  handleAddOrderToDB = async () => {
    var itemsObject: Object = {};
    this.state.Items.forEach((item) => {
      itemsObject[item.name] = item.quantity;
      console.log("hello");
    });
    console.log(JSON.stringify(itemsObject));

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemsObject),
      });

      const responseData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteOrder = (event, index) => {
    const newOrderHistory = this.state.OrderHistory.filter(
      (order: any[], index2) => {
        if (index === index2) {
          fetch(`http://localhost:5000/api/order/${order[0].quantity}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(order[0].quantity);
        }
        return index !== index2;
      }
    );

    this.setState({
      OrderHistory: newOrderHistory,
    });
  };

  /*
   * Specifically, aims to fix issue of local adds, then deletes
   * not deleting from DB
   */
  handleUnmount = () => {};
}

export default App;
