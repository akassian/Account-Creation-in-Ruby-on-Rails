Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/', to: 'application#render_react', as: :root
  get '/create-account', to: 'application#render_react', as: :create_account
  get 'signup/*all', to: 'application#render_react', as: :signup
  get 'logout', to: 'application#logout', as: :logout

  # API routes
  # Account creation
  post '/api/create-account', to: 'api#create_account'
end
