# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts '==> Creating the \'admin user\'...'

def random_hour(from, to)
    ((rand((Date.today - 15)..Date.today)) + rand(from..to).hour + rand(0..60).minutes).to_datetime
end

def check_out_date(check_in_date, from, to)
    (check_in_date.to_date + rand(from..to).hour ).to_datetime
end

# Delete all existing records.
User.delete_all
ClockEvent.delete_all

# Resets the sequence of the id to 1.
ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('clock_events')

# Content.

admin = User.new(email: 'admin@example.com', password: 'password', password_confirmation: 'password',
                username: 'Admin', role: 0)
admin.save!


employee = User.new(email: 'employee@example.com', password: 'password', password_confirmation: 'password',
    username: 'Employee',  role: 1)
employee.save!

20.times do
    randHr = 
    check_in_date = random_hour(8, 9)
    employee.clock_events.create(
        entry_date: check_in_date,
        clock_in: check_in_date, 
        clock_out: check_in_date + rand(3..6).hours,
        clocking_in: false,
        note: ""
    )
end
  
