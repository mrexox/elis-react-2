# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170921212841) do

  create_table "admin_users", force: :cascade do |t|
    t.string "login", null: false
    t.string "password_digest"
    t.text "description"
    t.string "avatar"
  end

  create_table "images", force: :cascade do |t|
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "post_id"
    t.index ["post_id"], name: "index_images_on_post_id"
  end

  create_table "likes", force: :cascade do |t|
    t.string "user_ip", null: false
    t.integer "post_id"
    t.index ["post_id"], name: "index_likes_on_post_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "name", null: false
    t.string "theme"
    t.string "email"
    t.string "telephone"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "title", null: false
    t.text "text", null: false
    t.string "permalink", null: false
    t.integer "image_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "views", default: 0
    t.index ["image_id"], name: "index_posts_on_image_id"
  end

  create_table "posts_tags", id: false, force: :cascade do |t|
    t.integer "post_id"
    t.integer "tag_id"
    t.index ["post_id", "tag_id"], name: "index_posts_tags_on_post_id_and_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
  end

end
