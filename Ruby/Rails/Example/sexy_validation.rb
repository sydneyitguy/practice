# REF: http://thelucid.com/2010/01/08/sexy-validation-in-edge-rails-rails-3/

class IntenseFilmTitleValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors[attribute] << "must start with 'The'" unless value =~ /^The/
  end
end

class SpendValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    spend = case options[:size]
      when :big then 100000000
      when :small then 100000
    end
    record.errors[attribute] << "must not exceed #{spend}" if value > spend
  end
end

class Film < ActiveRecord::Base
  validates :title, presence: true, intense_film_title: true
  validates :budget, spend: { size: :big } # using custom options
end


class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors[attribute] << (options[:message] || 'is not a valid email') unless value =~ /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
  end
end

class Person
  validates :email, email: true
end