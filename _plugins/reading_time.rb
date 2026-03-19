module ReadingTime
  def reading_time(input)
    words_per_minute = 180.0
    words = input.split.size
    (words / words_per_minute).ceil
  end
end

Liquid::Template.register_filter(ReadingTime)
