class Order < ApplicationRecord
  belongs_to :coffee

  enum brew_method: {
    aeropress: 0,
    coffee_maker: 1,
    cold_brew: 2,
    french_press: 3,
    pour_over: 4
  }, _prefix: :brew

  validates :coffee, presence: true
  validates :brew_method, presence: true, inclusion: { in: brew_methods.keys }
  validates :ship_at, presence: true
  validates :case_count, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :packets_per_case, presence: true, numericality: { only_integer: true }, inclusion: { in: [25, 50] }

  # self.per_page = 25



end
