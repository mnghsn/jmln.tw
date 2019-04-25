# coding: utf-8

require 'jekyll'
require 'html-proofer'

task :default => :test

desc 'Build your site'
task :build do
  Jekyll::Commands::Build.process({profile: true})
end

desc 'Serve your site locally'
task :serve do
  Jekyll::Commands::Serve.process({})
end

desc 'Clean the site (removes site output and metadata file) without building.'
task :clean do
  Jekyll::Commands::Clean.process({})
end

desc 'Test your site.'
task :test => [:clean, :build] do
  options = {
    :file_ignore => ['./_site/google49cb09583e67a84f.html'],
    :check_html => true,
    :check_opengraph => true,
    :check_favicon => true,
    :empty_alt_ignore => true,
    :http_status_ignore => [403],
    :only_4xx => true,
    :cache => {
      :storage_dir => '.jekyll-cache/html-proofer',
      :timeframe => '30d'
    }
  }
  HTMLProofer.check_directory('./_site', options).run
end
