# Safely Storing User Passwords

One of the main early challenges of building a backend for a public app is storing user credentials in a safe way. There are constantly [reports](https://thehackernews.com/2016/09/plaintext-passwords-leaked.html) about companies getting hacked and exposing millions of passwords because they were stored in plain text.

## Level 1: Plain Text

As a quick recap, storing user credentials in plain text is bad because anyone that gets access to the user credentials database can easily see what users have which passwords. An example of this might be
| username | password |
|----------|----------|
| alice    | 12345    |
| bob      | password |
| charlie  | qwert123 |

This is great news for attackers, as all they need to do is get access to the user database to figure out everyone's password. So how can we store passwords in a safer way? The first step involves some math.

## Level 2: Hash Functions

A hash function is a many-to-few algorithm that maps data of any size to fixed-size. In math, this is sometimes called a [trapdoor function](https://en.wikipedia.org/wiki/Trapdoor_function#:~:text=In%20theoretical%20computer%20science%20and,%2C%20called%20the%20%22trapdoor%22.), because it's very easy to compute but impossible (or at least very difficult) to reverse. So how do we use this to secure our user table? Well, when a user signs up for an account, instead of storing the plain text passwords, we can store a hash of their password. Then, every time a user logs in, we can compute the hash of their supplied login/password using the same hash function. If the stored hash is the same as the newly calculated hash, we can assume that they've entered the correct password.

There are a few caveats though. The first one is hash collision. Because this algorithm is many-to-few, it is possible that two different inputs yield the [same output](https://www.mscs.dal.ca/~selinger/md5collision/). In this case, an attacker could use a different password to trick the server into authenticating them. However, for hash function such as SHA-256, the chances of a collision are 1/2^256^. This means that while there is a nonzero chance for a hash collision, its effectively impossible.

The second caveat is lookup or rainbow tables. A lookup/rainbow table is a tabulated document containing pre-computed hashes for common passwords. Attackers can use these tables in a dictionary attack to try to figure out the reverse of the stored hashed passwords. For example, if a user has the password "querty123", and the dictionary has a pre-computed hash for "qwerty123", an attacker would be able to quickly know that the user is using that as their password. One option is to force users to not use common passwords. A better option is to do a bit more before storing them in the database.

## Level 3: Salt

Before computing the hash of a user's password, a little "salt" can be added to it. For example, the password "qwerty123" might become "qwerty123TLGKlAr5bZCStJZHut9fIOoDg6l4wtgp" (a 128 bit salt). Then, the hash can be computed like normal, and the salt can be saved with the hash. By doing this, dictionary attacks become significantly more innefficient, because pre-computed hashes cannot be used. This also has the added benefit of decoupling users. For example, if Alice and Bob both have the password "querty123", the random salt ensures that once Alice's password is determined that Bob's is not also determined.

To authenticate users, the salt can be read from the database, added to the supplied password, and then the hashes can be compared like normal. Having salt with your hash makes storing passwords significantly safer. However...

## Level 4: Slowing The Hash

The last issue to handle is simple brute force attacks. While hashing and salting your passwords is a great way to store them securely in your database, brute-force attacks will always be a potential issue. This is when an attacker tries every combination of characters to try to determine which password matches the hash. The issue with this is that it can't be stopped do to the analog nature of inputting passwords. So how can we better protect our users?

The key lies in the actual hashing algorithm. The "standard" hashing algorithm, SHA-256, is used a lot in situations such as determining file completeness due to its quick hash rate. While this sounds like a good thing for most users, storing passwords is dangerously effected by it. For example, a Radeon HD5830 GPU can calculate around 622 million SHA-256 hashes per second. That means that an attacker can brute force check 622 million passwords per second, or 537 trillion passwords in a day. The faster the hash rate, the faster an attacker can determine a user's password.

While it sounds counter-intuitive in a software engineering context, the easiest solution is to slow down the hash speed. A great implementation of this is the bcrypt function. This is a hashing function that scales with compute power to calculate hashes at a specific rate. The most commonly used hash rate is 1 hash every 250 ms. This is still very fast for a single calculation (especially when that calculation is something that doesn't happen very often, such as logging into a website), but is slow enough that it becomes unfeasible to brute force. At a rate of 1 hash every 250 ms, that's 4 hashes per second, nearly 155 million times slower than the SHA-256 algorithm. At this hash rate, a brute force attack becomes Sisyphean task, and you can now say that your passwords are secure.

## Conclusion

There are always going to be security vulnerabilities in your systems — whether that's due to how you handle requests or how users use your system, and no system can be cryptographically perfect. However, the aim of cryptography isn't to be perfect, it's to be good enough that a hacker decides to move on to someone else's system. By implementing the above mentioned techniques, even if an attacker gets access to your database, they won't be able to do anything with it, and your users can rest assured that you're protecting their data.
