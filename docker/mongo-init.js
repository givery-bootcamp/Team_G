db = db.getSiblingDB('SNS');

db.createCollection('Post', {capped: false});

db.Post.insert(
  {
   	"title" : "Hello, World!",
    "body" : "This is a test post.",
    "user_id" : "507f1f77bcf86cd799439011",
	"user_name": "test_user",
    "comments" : [],
	"image_url": "https://es4.eedept.kobe-u.ac.jp/wp-content/uploads/2022/05/Nagatani.jpg",
    "created_at": {
      "seconds": 0,
      "nanos": 0
    },
    "updated_at": {
      "seconds": 0,
      "nanos": 0
    }
  }
);

db.Post.insert(
  {
   	"title" : "Hello, Hell!",
    "body" : "This is a second test post.",
    "user_id" : "507f1f77bcf86cd799439012",
	"user_name": "test_user2",
    "comments" : [],
	"image_url": "https://es4.eedept.kobe-u.ac.jp/wp-content/uploads/2022/05/Nagatani.jpg",
    "created_at": {
      "seconds": 0,
      "nanos": 0
    },
    "updated_at": {
      "seconds": 0,
      "nanos": 0
    }
  }
);

// MongoDB内で使用するIDは、ObjectId関数で生成しなければならない
// 文字列だとエラーになる
db.Post.insert(
  {
   	"title" : "Hello, Hell!",
    "body" : "This is a second test post.",
    "user_id" : "507f1f77bcf86cd799439012",
	"user_name": "test_user2",
    "comments" : [{"_id": ObjectId("667cd7db1eb82bf6f8462c9d"), "user_id": "507f1f77bcf86cd799439011", "body": "This is a comment."}],
	"image_url": "https://avatars.githubusercontent.com/u/45951565?v=4",
    "created_at": {
      "seconds": 0,
      "nanos": 0
    },
    "updated_at": {
      "seconds": 0,
      "nanos": 0
    }
  }
);

db.Post.insert(
  {
   	"title" : "Aoi Yuya Basa",
    "body" : "This is a pen",
    "user_id" : "507f1f77bcf86cd799439012",
	"user_name": "test_user3",
    "comments" : [{"_id": ObjectId("667cd7db1eb82bf6f8462c9f"), "user_id": "507f1f77bcf86cd799439011", "body": "mongodb objectID go to hell"}],
	"image_url": "https://avatars.githubusercontent.com/u/41140188?v=4",
    "created_at": {
      "seconds": 0,
      "nanos": 0
    },
    "updated_at": {
      "seconds": 0,
      "nanos": 0
    }
  }
);