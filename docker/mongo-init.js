db = db.getSiblingDB('SNS');

db.createCollection('Post', {capped: false});

db.Post.insert(
  {
   	"title" : "Hello, World!",
    "body" : "This is a test post.",
    "user_id" : "507f1f77bcf86cd799439011",
    "comments" : [],
	"image_url": "https://www.google.com",
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
    "comments" : [],
	"image_url": "https://www.google.com",
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
    "comments" : [{"_id": "667cd7db1eb82bf6f8462c9d", "user_id": "507f1f77bcf86cd799439011", "body": "This is a comment."}],
	"image_url": "https://www.google.com",
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