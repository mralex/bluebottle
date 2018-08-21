FactoryBot.define do
  factory :order do
    coffee
    brew_method { ['aeropress', 'coffee_maker', 'cold_brew', 'french_press', 'pour_over'].sample }
    ship_at { Faker::Date.forward(90) }
    case_count { Faker::Number.between(1, 20) }
    packets_per_case { [25, 50].sample }
    is_priority { [false, false, false, true].sample }
    notes { ['', '', '', Faker::Coffee.notes].sample }
  end
end
