FactoryBot.define do
  factory :user do
    username { 'Test User' }
    email { 'test@email.com' }
    password { '12345678' }
    password_confirmation { '12345678' }

    trait :without_username do
      username { nil }
    end
    trait :without_email do
      email { nil }
    end
    trait :without_password do
      password { nil }
    end
  end
end
