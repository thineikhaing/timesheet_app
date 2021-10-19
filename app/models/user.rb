class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:trackable

  enum role: {admin: 0, user: 1}
  validates :username, :email, presence: true
  has_many :clock_events, dependent: :destroy

  def as_json(options=nil)
    super(only: [:id, :username, :email, :role], methods: [:clocked_in_status])
end

  def clocked_in_status
    clocked_in = self.clock_events.where(clocking_in: true)
    if clocked_in.count > 0
        return "clocked in"
    else
      return "clocked out"
    end
  end

end
