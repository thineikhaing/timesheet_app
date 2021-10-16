class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def create_clock_event
    entryTime = params[:dateTime]

    if entryTime
      dateTime = entryTime #DateTime.parse entryTime
    else
      dateTime = DateTime.now
    end

    p dateTime
    clock_event = current_user.clock_events.where(entry_date: dateTime,clocking_in: true).take 
    if clock_event.present?
      p "set clock out time"
      clock_event = clock_event.update(clock_out: dateTime,clocking_in: false)
    else
      p "creat new clock in time"
      clock_event = ClockEvent.create(user_id: current_user.id, entry_date: dateTime, clock_in: dateTime,clocking_in: true) unless clock_event.present?
    end
   
    render json: current_user.clock_events, status: :ok
  end

  def get_timesheet
    isClockingin = false
    clock_events = current_user.clock_events.select(:id, :entry_date, :clock_in, :clock_out).order("entry_date DESC")
    p check_clocking_in = current_user.clock_events.where(clocking_in: true).take
    if check_clocking_in.present?
      isClockingin = true
    end
    # timelogs = clock_events.group_by{ |item| item.entry_date.to_date }
    render json: {clock_event: clock_events, isClockingin: isClockingin, status: 200 } 

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

end
