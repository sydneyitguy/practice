class User(n: String) {
  def name() = n
}

object Cache {
  def main(args: Array[String]) {
    var user = new User("Sebastian")
    println(user.name())

  }
}

// class Entry {
// }

// class Tree {
//   Node head;

//   // swap,,
// }

// class Node {
//   Node prev;
//   Node next;
// }


// Class Cahce {
// Tree<Node> queue = new Tree();
// HashMap<key, Node> map = new HashMap<key, Node>();

// public User getUserByLogin(String key) {

//   // Check the cache
//   if(queue.hasKey(key)) {
//     node = map.get(key);

//     node.next = null;
//     prev = node.prev();
//     prev.next = node.next.next();
//     prev = queue.end();

//     //cache = queue.get(key);
//     //queue.remove(key);
//     queue.push(cache);

//     return cache;
//   } else {
//     if(user = getUserFromDb(key) !== null) {
//       if(queue.isFull()) {
//         node = queue.deque();
//         map.delete(node.key);
//       }
//       queue.push(user);
//       map.insert(key, queue.end());

//       return user;
//     } else {
//       return null;
//     }
//   }
// }

// private User getUserFromDb(String key);



