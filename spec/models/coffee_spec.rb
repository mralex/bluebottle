require 'rails_helper'

RSpec.describe Coffee, type: :model do
  it { should have_many :orders }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
end
