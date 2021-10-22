class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    # render role_template
  end

  def get_timesheet
    isClockingin = false
    clockedinDate = DateTime.now
    clock_events = current_user.clock_events.select(:id, :entry_date, :clock_in, :clock_out).order("clock_in DESC")
    p check_clocking_in = current_user.clock_events.where(clocking_in: true).take

    if check_clocking_in.present?
      isClockingin = true
      clockedinDate = check_clocking_in.clock_in
    end

    monthly_worked_hours = current_user.clock_events.current_month.map{|y| y.worked_hr}.reduce(:+).round(2)
    weekly_worked_hours = current_user.clock_events.current_week.map{|y| y.worked_hr}.reduce(:+).round(2)

    today = Date.today # Today's date
    current_week = (today.at_beginning_of_week..today.at_end_of_week)

    render json: {clock_events: clock_events, isClockingin: isClockingin,clockedinDate: clockedinDate, monthly_hrs: monthly_worked_hours,weekly_hrs:weekly_worked_hours,current_week:current_week, status: 200 } 
  end

  def get_user_clockevents
    staff = User.find(params[:id])
    clock_events = staff.clock_events.select(:id, :entry_date, :clock_in, :clock_out).order("clock_in DESC")
    monthly_worked_hours = staff.clock_events.current_month.map{|y| y.worked_hr}.reduce(:+)
    weekly_worked_hours = staff.clock_events.current_week.map{|y| y.worked_hr}.reduce(:+)

    render json: {user: staff,clock_events: clock_events,monthly_hrs: monthly_worked_hours,weekly_hrs:weekly_worked_hours, status: 200 } 

  end

  def initial_retrieve
    users = User.where(role: 1).order("id ASC")
    render json: {users: users}
  end

  def create_clock_event
    isInbtwTime = false
    entryTime = params[:dateTime]
    if entryTime
      dateTime = DateTime.parse(entryTime).utc
    else
      dateTime = DateTime.now
    end
    
    clock_event = current_user.clock_events.where(entry_date: dateTime,clocking_in: true).take 
    if clock_event.present?
     
      clock_event = clock_event.update(clock_out: dateTime,clocking_in: false)
    else

      isInbtwTime = check_overlap_clockedin(dateTime, dateTime) 
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
    p "check overlap time"

    checkOverLap = false
    clock_event = ClockEvent.find(params[:id])
    params[:clock_out].present? ? clock_out = params[:clock_out] : clock_out = nil
    params[:clock_in].present? ? clock_in = params[:clock_in] : clock_in = nil
    
    checkOverLap = check_overlap_clockedin(clock_event.entry_date, clock_in, clock_out , clock_event.id)

    if checkOverLap == false
       p "update event!!!"
      clock_event.update(clock_in: params[:clock_in], clock_out: params[:clock_out])
      isInbtwTime = false
    end

    render json: {clock_event: current_user.clock_events, overlapTime: checkOverLap}, status: :ok
  end

  def delete_clockevent
    ClockEvent.find(params[:id]).destroy
    render json: {}, status: :ok
  end

  protected

  def check_overlap_clockedin(entryDate, clock_in, clock_out=nil, clockId=0)

    isOverLap = false 
    check_arr = [false]

    prev_events = current_user.clock_events.where("id not in (?) and entry_date =?", clockId, entryDate)
    p prev_events.count

    prev_events.each do |event|
      start_time = event.clock_in
      end_time = event.clock_out

      if clock_out.present?
        if (clock_in.between?(start_time, end_time) || clock_out.between?(start_time, end_time))
          check_arr.push(true)
          p "condition 1"
        elsif clock_out > end_time
          check_arr.push(true)
          p "condition 2"
        end

      elsif (clock_in.between?(start_time, end_time)) 
        check_arr.push(true)
        p "condition 3"
      end
    end

    isOverLap = check_arr.include?(true)

    p "isOverLap #{isOverLap}"

    return isOverLap

  end


end
