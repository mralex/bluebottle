# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


if Coffee.count == 0
    Coffee.create([
        { name: 'Bella Donovan'},
        { name: 'Giant Steps'},
        { name: 'Night Light Decaf'},
        { name: 'Panama Finca Santa Teresa Zorra Gesha'},
        { name: 'Tanzania Mbeya Valley'},
        { name: 'Three Africas'},
        { name: 'Yemen Port of Mokha Al-Jabal #42'},
    ])
end

coffees = Coffee.count

for i in 0...100
    Order.create(
       coffee_id: Faker::Number.between(1, coffees),
       brew_method: Faker::Number.between(0, 4),
       ship_at: Faker::Date.forward(90),
       case_count: Faker::Number.between(1, 20),
       packets_per_case: [25, 50].sample,
       is_priority: [false, false, false, true].sample,
       notes: ['', '', '', Faker::Coffee.notes].sample
    )
end
