class ClockEvent < ApplicationRecord
    belongs_to :user
    validates :entry_date, :clock_in, presence: true
    
    def as_json(options=nil)
        super(only: [:id, :entry_date, :clock_in, :clock_out,:clocking_in], methods: [:total_hours])
    end

    scope :current_month, -> {
        start = Time.zone.now
        where(clock_in: start.beginning_of_month..start.end_of_month)  
    }

    scope :current_week, ->{
        start = Time.zone.now 
        where(clock_in: start.beginning_of_week..start.end_of_week)
    }

    scope :payroll_week, ->{
        start = Time.zone.now.beginning_of_week
        ending = start.end_of_week + 7.days 
        where(clock_in: start..ending)
    }

    scope :business_days, ->{
        where("EXTRACT(DOW FROM clock_events.clock_in) in (?)", 1..5)
    }

    def self.current_month_weekdays_weekends
        start_date = Date.today.beginning_of_month
        end_date = Date.today.end_of_month
        weekdays = (start_date..end_date).select{|a| a.wday < 6 && a.wday > 0}.count
        weekends = (start_date..end_date).select{|a| a.wday == 6 || a.wday == 0}.count
    end



    def worked_hr
        if self.clock_in.present? && self.clock_out.present?
            ((self.clock_out.to_f - self.clock_in.to_f) / 3600 ).round(1)
        else
            0
        end
    end

    def total_hours
        if self.clock_in.present? && self.clock_out.present?
            total_hours = (self.clock_out.to_f - self.clock_in.to_f) / 3600 
            if total_hours > 1
                total_hours.round(1)
                return "#{total_hours.round(1)} Hours"
            else
                total_seconds = (self.clock_out.to_f - self.clock_in.to_f) / 60 
                return "#{total_seconds.round(0)} Minutes"
            end
        else
            return ""
        end
    end


end
