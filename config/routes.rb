Rails.application.routes.draw do
  
  root 'home#index'
  devise_for :users
  resources :users, only: [:create, :show, :update, :destroy]


  get 'get_timesheet', to: 'home#get_timesheet'
  
  get 'initial_retrieve', to: 'home#initial_retrieve'
  post 'create_clock_event' , to: 'home#create_clock_event'
  
  post 'update_clockevent' , to: 'home#update_clockevent'
  post 'delete_clockevent' , to: 'home#delete_clockevent'

  get 'edit_clockevent/:id' , to: 'home#edit_clockevent'
  get 'get_user_clockevents/:id' , to: 'home#get_user_clockevents'

  get '*path', to: 'home#index'

  namespace :api do
    namespace :v1 do
      match 'clock_event/index' , via: [:get, :post]
      match 'clock_event/create', via: [:get, :post]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
