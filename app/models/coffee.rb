class Coffee < ApplicationRecord
    validates :name, presence: true, uniqueness: true
end
