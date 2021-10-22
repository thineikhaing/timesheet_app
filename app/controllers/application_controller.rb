class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    before_action :configure_permitted_parameters, if: :devise_controller?
  
    def after_sign_in_path_for(resource)
        root_path

    end
    private

    def role_template
        user_role = current_user.role ==  "admin" ? "admin" : "user"
        "#{user_role}_#{action_name}"
    end

    protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation)}
        devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation)}
    end
end
