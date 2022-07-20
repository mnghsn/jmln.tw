# coding: utf-8

require "jekyll"
require "html-proofer"

task :default => :test

desc "Build your site"
task :build do
  Jekyll::Commands::Build.process({profile: true})
end

desc "Serve your site locally"
task :serve do
  Jekyll::Commands::Serve.process({})
end

desc "Clean the site (removes site output and metadata file) without building."
task :clean do
  Jekyll::Commands::Clean.process({})
end

desc "Test your site."
task :test => [:clean, :build] do
  options = {
    :check_external_hash => false,
    :check_internal_hash => true,
    :ignore_missing_alt => true,
    :ignore_status_codes => [403],
    :only_4xx => true,
    :cache => {
      :storage_dir => ".jekyll-cache/html-proofer",
      :timeframe => {
        :external => '30d',
        :internal => '15d'
      }
    }
  }
  HTMLProofer.check_directory("./_site", options).run
end
