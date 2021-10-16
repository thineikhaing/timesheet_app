class Api::V1::ClockEventController < ApplicationController

    def index
        clock_events = ClockEvent.select(:id, :entry_date, :clock_in, :clock_out, :clocking_in).where(user_id: params[:user_id])
        timelogs = clock_events.group_by{ |item| item.entry_date.to_date }
        render json: {status:200, timelogs: timelogs,clock_events:clock_events}
    end

    def create
    end

    private

    def set_clock_event
        @clock_event = ClockEvent.find(params[:id])
      end

    def clock_event_params
        params.permit(:user_id, :clock_in, :clock_out,:clocking_in)
    end
end