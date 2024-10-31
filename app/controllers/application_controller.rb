class ApplicationController < ActionController::Base
  def render_react
    react
  end

  def logout
    # TODO: handle JWT logout
    cookies.signed[:jwt] = ''
    redirect_to '/'
  end

  private

  def react
    render layout: 'application', template: 'vite/index'
  end
end
