require 'rails_helper'

RSpec.describe Api::OrdersController, type: :controller do
  before do
    @coffee = FactoryBot.create(:coffee)
    @coffee2 = FactoryBot.create(:coffee)

    @order = FactoryBot.create(:order, coffee: @coffee)
  end

  describe 'creating orders' do
    it 'returns a 200 on a successful order creation' do
      params = FactoryBot.attributes_for(:order, coffee: @coffee)
      params[:coffee_id] = @coffee.id

      post :create, params: { order: params }

      should respond_with 200
      expect(Order.last).to have_attributes(params)
    end

    it 'returns a 400 on an unsuccessful order creation' do
      params = FactoryBot.attributes_for(:order)

      post :create, params: { order: params }

      should respond_with 400

      json_body = JSON.parse response.body

      expect(json_body["coffee"]).to match (["must exist", "can't be blank"])
    end

    it 'returns a 400 for an invalid brew method' do
      params = FactoryBot.attributes_for(:order, coffee: @coffee, brew_method: 'foo')
      params[:coffee_id] = @coffee.id

      post :create, params: { order: params }

      should respond_with 400

      json_body = JSON.parse response.body
      expect(json_body["error"]).to match ("'foo' is not a valid brew_method")
    end
  end

  describe 'updating orders' do
    it 'returns a 201 on a successful order update' do
      params = {
        coffee_id: @coffee2.id
      }

      put :update, params: { id: @order.id, order: params }

      should respond_with 201
    end

    it 'returns a 400 on a successful order update' do
      params = {
        brew_method: nil
      }

      put :update, params: { id: @order.id, order: params }

      should respond_with 400

      json_body = JSON.parse response.body

      expect(json_body["brew_method"]).to match (["can't be blank", "is not included in the list"])
    end
  end
end
