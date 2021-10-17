class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def get_timesheet
    isClockingin = false
    clockedinDate = DateTime.now
    clock_events = current_user.clock_events.select(:id, :entry_date, :clock_in, :clock_out).order("entry_date DESC")
    p check_clocking_in = current_user.clock_events.where(clocking_in: true).take
    if check_clocking_in.present?
      isClockingin = true
      clockedinDate = check_clocking_in.clock_in
    end
    # timelogs = clock_events.group_by{ |item| item.entry_date.to_date }
    monthly_worked_hours = current_user.clock_events.current_month.map{|y| y.worked_hr}.reduce(:+)
    weekly_worked_hours = current_user.clock_events.current_week.map{|y| y.worked_hr}.reduce(:+)
    today = Date.today # Today's date
    current_week = (today.at_beginning_of_week..today.at_end_of_week)
    render json: {clock_event: clock_events, isClockingin: isClockingin,clockedinDate: clockedinDate, monthly_hrs: monthly_worked_hours,weekly_hrs:weekly_worked_hours,current_week:current_week, status: 200 } 
  end

  def create_clock_event
    isInbtwTime = false
    entryTime = params[:dateTime]
    if entryTime
      dateTime = DateTime.parse(entryTime).utc
    else
      dateTime = DateTime.now
    end
    
    check_arr = []
    clock_event = current_user.clock_events.where(entry_date: dateTime,clocking_in: true).take 
    if clock_event.present?
      p "set clock out time"
      clock_event = clock_event.update(clock_out: dateTime,clocking_in: false)
    else
      prev_events = current_user.clock_events.where(entry_date: dateTime,clocking_in: false)
      prev_events.each do |event|
        p start_time = event.clock_in
        p end_time = event.clock_out
        check_arr.push((start_time..end_time).cover?(dateTime))
      end

      isInbtwTime = check_arr.include?(true)

      if isInbtwTime == false
        clock_event = ClockEvent.create(user_id: current_user.id, entry_date: dateTime, clock_in: dateTime,clocking_in: true)   
      end
    end
    
   
    render json: {clock_event: current_user.clock_events, overlapTime: isInbtwTime}, status: :ok
  end

  def edit_clockevent
    clock_event = ClockEvent.find(params[:id])
    render json: clock_event.to_json
  end

  def update_clockevent
    clock_event = ClockEvent.find(params[:id])
    clock_event.update(clock_in: params[:clock_in], clock_out: params[:clock_out])
    render json: clock_event.to_json
  end

  def delete_clockevent
    ClockEvent.find(params[:id]).destroy
    render json: {}, status: :ok
  end

end
