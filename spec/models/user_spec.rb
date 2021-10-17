require 'rails_helper'

RSpec.describe User, type: :model do
  context 'Create User' do
    it 'should be valid' do
      user = build(:user)
      expect(user.valid?).to be(true)
    end

    it 'should be invalid without username' do
      user = build(:user, :without_username)
      expect(user.valid?).to be(false)
    end

    it 'should be invalid without email' do
      user = build(:user, :without_email)
      expect(user.valid?).to be(false)
    end
    it 'should be invalid without password' do
      user = build(:user, :without_password)
      expect(user.valid?).to be(false)
    end

    it 'should not be admin' do
      user = create(:user)
      expect(user.admin?).to be(false)
    end
  end


  context 'Updat User' do
    before(:each) do
      @user = create(:user)
    end

    it 'should update name to Changed Name' do
      @user.update(username: 'Changed Name')
      @user.reload
      expect(@user.username).to eq('Changed Name')
    end

    it 'should raise error when update username to nil' do
      expect{
        @user.update!(username: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'should raise error when update email to nil' do
      expect{
        @user.update!(email: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'should raise error when update password to nil' do
      expect{
        @user.update!(password: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'should update role to admin' do
      @user.update(role: 'admin')
      @user.reload
      expect(@user.role).to eq('admin')
    end
  end


  context 'Delete user' do
    before(:each) do
      @user = create(:user)
    end

    it 'should change user count by -1' do
      expect{
        @user.destroy
      }.to change(User,:count).by(-1)
    end

    it 'should destroy clock events when destroying a user' do
      clock_event = @user.clock_events.create(entry_date: DateTime.now, clock_in:  DateTime.now, clock_out: DateTime.now+5.hours, clocking_in:false)
      clock_event = clock_event.id

      @user.destroy
      expect{
        ClockEvent.find(clock_event)
      }.to raise_error(ActiveRecord::RecordNotFound)
    end

  end
  
end
