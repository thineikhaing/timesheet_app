class ClockEvent < ApplicationRecord
    belongs_to :user
    validates :entry_date, :clock_in, presence: true
    
    def as_json(options=nil)
        super(only: [:id, :entry_date, :clock_in, :clock_out,:clocking_in], methods: [:total_hours])
    end

    scope :current_month, ->{
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
        where("EXTRACT(DOW FROM clocked_in) in (?)", 1..5)
    }

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
            total_hours.round(1)
            return "#{total_hours.round(1)} Hours"
        else
            return ""
        end
    end


end
