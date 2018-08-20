class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.references :coffee, foreign_key: true
      t.integer :brew_method, default: 1, null: false
      t.date :ship_at
      t.integer :case_count, default: 1, null: false
      t.integer :packets_per_case, default: 25, null: false
      t.boolean :is_priority, default: false, null: false, index: true
      t.text :notes

      t.timestamps
    end
  end
end
