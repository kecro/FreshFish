import React from "react"
import { formatPrice } from "../helpers"

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const isAvailable = fish && fish.status === "available"

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available
        </li>
      )
    }
    if (fish) {
      return (
        <li key={key}>
          {count} lbs {fish.name}
          <hr />
          {formatPrice(count * fish.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        </li>
      )
    }

  }
  
  countFish = (prevTotal, key) => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const isAvailable = fish && fish.status === "available"

    if (isAvailable) {
      return prevTotal + count * fish.price
    }
    return prevTotal
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce(this.countFish, 0)

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
