class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :get_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
  end

def create
    @user = User.create!(user_params)
    if @user.persisted?
      render json: @user, status: :created
    else
      render json: { message: 'Error creating user' }, status: 402
    end
  end

  def show
    render json: @user, status: :ok
  end

  def update
    @user.update(user_params)
    render json: @user, status: :ok
  end

  def destroy
    @user.destroy
    render json: {}, status: :ok
  end

  private

  def get_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :role)
  end
end