##
# Simple Github API
# @author: Sebastian Kim
#

require 'open-uri'

class Github
  WEB_URL = 'https://github.com'
  API_URL = 'https://api.github.com'

  def initialize(user)
    @user = user
  end

  def repos
    data = json API_URL + "/users/#{@user}/repos"
    data.reduce([]) do |repos, repo|
      repos << {
        :link => repo['html_url'],
        :name => repo['name']
      }
    end
  end

  def contents(repo)
    data = json API_URL + "/repos/#{@user}/#{repo}/contents"

    data.reduce([]) do |contents, content|
      contents << {
        :link => content['_links']['html'],
        :name => content['name']
      }
    end
  end

  def commits(repo)
    data = json API_URL + "/repos/#{@user}/#{repo}/commits"
    data.reduce([]) do |commits, commit|
      commits << {
        :link => WEB_URL + "/#{@user}/#{repo}/commit/" + commit['sha'],
        :name => commit['commit']['message']
      }
    end
  end
private
  def json(url)
    JSON.parse(open(url).read)
  end
end