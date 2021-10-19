namespace :defaultusers_setup do 
    desc 'Fills the database with fake data'
    task fill_database: :environment do
        puts '==> Filling the database...'
        20.times do
            employee = User.new(email: Faker::Internet.email, password: 'password', password_confirmation: 'password',
                username: Faker::Name.name)
            employee.save!

            20.times do
                check_in_date = random_hour(8, 9)
                employee.clock_events.create(
                    entry_date: check_in_date,
                    clock_in: check_in_date, 
                    clock_out: check_in_date + rand(3..6).hours,
                    clocking_in: false,
                    note: ""
                )
            end


        end
    end
end

private
def random_hour(from, to)
    ((rand((Date.today - 15)..Date.today)) + rand(from..to).hour + rand(0..60).minutes).to_datetime
end
