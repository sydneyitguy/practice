class MutexExample
  @@lock = Mutex.new

  def example
    @@lock.synchronize do
      # do dangerous stuff here
    end
  end
end