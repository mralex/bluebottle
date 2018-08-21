FactoryBot.define do
  factory :coffee do
    name { Faker::Coffee.blend_name }
  end
end
