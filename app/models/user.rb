class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:trackable

  enum role: {admin: 0, user: 1}
  validates :username, :email, presence: true
  has_many :clock_events, dependent: :destroy
end
