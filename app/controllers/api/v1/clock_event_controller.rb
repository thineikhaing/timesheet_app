class Api::V1::ClockEventController < ApplicationController

    def index
        p "get clock events"
        clock_events = ClockEvent.select(:id, :entry_date, :clock_in, :clock_out, :clocking_in).where(user_id: params[:user_id]).order("entry_date DESC")
        timelogs = clock_events.group_by{ |item| item.entry_date.to_date}
        dataArray = []
        timelogs.each do |key, value|
            defined_Fields = Hash.new
            defined_Fields[:date] = key
            defined_Fields[:events] = value
            dataArray << defined_Fields
        end
        render json: {status:200,clock_events:dataArray}
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