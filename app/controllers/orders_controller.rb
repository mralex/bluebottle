class OrdersController < ApplicationController
  def index
    @orders = Order.includes(:coffee).all.order(ship_at: :desc)
  end
end
