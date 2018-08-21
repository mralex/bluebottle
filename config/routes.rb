Rails.application.routes.draw do
  namespace :api do
    resources :orders, only: [:index, :create, :update]
  end

  resources :orders, only: [:index, :create, :update]

  root 'orders#index'
end
