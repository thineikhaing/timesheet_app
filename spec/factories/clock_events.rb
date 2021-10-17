FactoryBot.define do
  factory :clock_event do
    entry_date {"2021-10-17"}
    clock_in {"2021-10-17 00:30:13.142000000 +0000"}
    clock_out {"2021-10-17 07:30:13.142000000 +0000"}
    clocking_in {false}
    note {""}
    user


    trait :without_entry_date do 
      entry_date {nil}
    end

    trait :without_clock_in do
      clock_in {nil}
    end


  end
end
