class CreateCoffees < ActiveRecord::Migration[5.2]
  def change
    create_table :coffees do |t|
      t.string :name

      t.timestamps
    end
    add_index :coffees, :name, unique: true
  end
end
