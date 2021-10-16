class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def create_clock_event
    entryTime = params[:dateTime]

    if entryTime
      dateTime = DateTime.parse entryTime
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

    clock_events = current_user.clock_events.select(:id, :entry_date, :clock_in, :clock_out, :clocking_in)
    timelogs = clock_events.group_by{ |item| item.entry_date.to_date }
    # render json: {status:200, timelogs: timelogs,clock_events:clock_events}
    render json: clock_events.to_json(methods: [:entry_date,:clock_in,:clock_out, :clocking_in])

  end

end
