require 'rails_helper'

RSpec.describe Order, type: :model do
  it { should belong_to :coffee }

  it { should validate_presence_of(:coffee) }
  it { should validate_presence_of(:brew_method) }
  it { should validate_presence_of(:ship_at) }

  it { should validate_presence_of(:case_count) }
  it { should validate_numericality_of(:case_count) }
  
  it { should validate_presence_of(:packets_per_case) }
  it { should validate_numericality_of(:packets_per_case) }
  it { should validate_inclusion_of(:packets_per_case).in_array([25, 50]) }

  it { should define_enum_for :brew_method }

end
