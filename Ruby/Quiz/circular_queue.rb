# Circular Queue using array
# @author: Sebastian Kim

class CircularQueue
  def initialize(max_length)
    @max_length = max_length
    @queue = []
    @head = 0
    @tail = 0
  end

  def enqueue(obj)
    if length == @max_length
      return false
    elsif @tail != @head || length != 0
      @tail = (@tail + 1) % @max_length
    end

    @queue[@tail] = obj
  end

  def dequeue
    backup = @queue[@head]
    @queue[@head] = nil

    if backup.nil?
      return false
    elsif @tail != @head
      @head = (@head + 1) % @max_length
    end

    backup
  end

  def length
    if @queue[@head].nil?
      return 0
    elsif @tail > @head
      @tail - @head + 1
    else
      @head - @tail + @max_length - 1
    end
  end

  def inspect
    "max_length: #{@max_length}\n" +
    "length: #{length}\n" +
    "head: #{@head}\n" +
    "tail: #{@tail}\n" +
    "queue: #{@queue.inspect}\n"
  end
end
