require 'rails_helper'

RSpec.describe ClockEvent, type: :model do
  context 'Create Clock Event' do
    it 'should be valid' do
      clock_event = build(:clock_event)
      expect(clock_event.valid?).to be(true)
    end

    it 'should change clock event count by +1' do
      expect{
        clock_event = create(:clock_event)
      }.to change(ClockEvent,:count).by(+1)
    end

    it 'should not be valid without Entry Date' do
      clock_event = build(:clock_event, :without_entry_date)
      expect(clock_event.valid?).to be(false)
    end

    it 'should not be valid without Clock In' do
      clock_event = build(:clock_event, :without_clock_in)
      expect(clock_event.valid?).to be(false)
    end

    it 'should raise activerecord invalid' do
      expect{
        clock_event = ClockEvent.create!()
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  context 'Update Clock Event' do 

    before(:each) do
      @clock_event = create(:clock_event)
    end

    it 'should not update entry_date to nil' do
      expect{
        @clock_event.update!(entry_date: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end


    it 'should not update user to nil' do
      expect{
        @clock_event.update!(user_id: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'should update clocking_in to true' do
      @clock_event.update(clocking_in: true)
      @clock_event.reload
      expect(@clock_event.clocking_in).to be(true)
    end

  end
end
