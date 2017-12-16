# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


AdminUser.create :login: 'elis', password: 'password', description: 'Admin of the site'

Post.create title: 'New Logo', text: 'Meet my new logo', permalink: 'new-logo-1', tags: []
Post.create title: 'Beautiful writing', text: 'Here are some of my works', permalink: 'beau-writing', tags: []

Message.create name: 'Valentine', theme: 'Hello, how are you?', text: 'Really, how are you?', telephone: '+7889922222'

