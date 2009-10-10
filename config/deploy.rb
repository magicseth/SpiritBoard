set :application, "SpiritBoard"
set :repository,  "git@github.com:magicseth/SpiritBoard.git"
set :branch, "master"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

set :deploy_to, "/home/betterma/apps/cap/SpiritBoard"

default_run_options[:pty] = true
set :ssh_options, { :forward_agent => true }

set :user, "betterma"

# set :deploy_via, :remote_cache



role :web, "bettermagician.com"                          # Your HTTP server, Apache/etc
role :app, "bettermagician.com"                          # This may be the same as your `Web` server
role :db,  "bettermagician.com", :primary => true # This is where Rails migrations will run
# role :db,  "your slave db-server here"

# If you are using Passenger mod_rails uncomment this:
# if you're still using the script/reapear helper you will need
# these http://github.com/rails/irs_process_scripts

# namespace :deploy do
#   task :start {}
#   task :stop {}
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end