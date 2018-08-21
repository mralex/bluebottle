class OrderSerializer < ActiveModel::Serializer
  attributes :id, :coffee_id, :brew_method, :ship_at, :case_count, :packets_per_case, :is_priority, :notes, :updated_at
end
