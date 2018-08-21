class Api::OrdersController < ApplicationController
  def index
    page_num = params[:page] || 1
    @orders = Order.includes(:coffee).order(ship_at: :desc).page(page_num)

    render json: @orders, meta: pagination_dict(@orders)
  end

  def create
    @order = Order.create(order_params)

    unless @order.valid?
      render json: @order.errors, status: 400
      return
    end

    render json: @order

  rescue ArgumentError => e
    render json: { error: e.to_s }, status: 400
  end

  def update
    @order = Order.find(params[:id])

    @order.update_attributes(order_params)

    unless @order.valid?
      render json: @order.errors, status: 400
      return
    end

    head 201
  rescue ArgumentError => e
    render json: { error: e.to_s }, status: 400
  end

  private

  def order_params
    params.require(:order).permit(:coffee_id, :brew_method, :ship_at, :case_count, :packets_per_case, :is_priority, :notes)
  end

  def pagination_dict(collection)
    {
      current_page: collection.current_page,
      next_page: collection.next_page,
      prev_page: collection.prev_page, # use collection.previous_page when using will_paginate
      total_pages: collection.total_pages,
      total_count: collection.total_count
    }
  end
end
