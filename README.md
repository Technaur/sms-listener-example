## Generate the 11 character hash

---

1.  <u>**Build your keytool command. (I ran mine in bash, powershell might behave differently)**</u>

    Just <b>replace</b> `com.sms_listener` with your own package name.
    The default `-alias` for the debug keystore will always be **`androiddebugkey`**

    ```
    keytool -exportcert -alias androiddebugkey -keystore '~\.android\debug.keystore' | xxd -p | tr -d "[:space:]" | echo -n <<<com.sms_listener>>> `cat` | sha256sum | tr -d "[:space:]-" | xxd -r -p | base64 | cut -c1-11
    ```

    ```
    keytool -exportcert -alias androiddebugkey -keystore '~\.android\debug.keystore' | xxd -p | tr -d "[:space:]" | echo -n com.sms_listener `cat` | sha256sum | tr -d "[:space:]-" | xxd -r -p | base64 | cut -c1-11
    ```

<!-- https://github.com/googlesamples/android-credentials/blob/master/sms-verification/bin/sms_retriever_hash_v9.sh -->

```
$ ./sms_retriever_hash-v9.sh --package com.sms_retriever --keystore '/c/Users/franc/.android/debug.keystore'
```

```
keytool -exportcert -alias androiddebugkey -keystore debug.keystore | xxd -p | tr -d "[:space:]" | echo -n com.sms_l
istener `cat` | sha256sum | tr -d "[:space:]-" | xxd -r -p | base64 | cut -c1-11
```

The last one worked on Windows

    If you are using the debug keystore like me, it will ask for a password after you run the above command.
    The default password is: <b>`android`</b>

    A string will then be generated, something like this: <b>`gaMzAZ+vMRr`</b>

2.  <u>**In the extended controls for Android Emulator**</u>

    Phone --> SMS Message

    ```
    <#> Your Example app code is: 123ABC78 /gaMzAZ+vMRr
    ```

    Of course replacing the 11 hash characters at the end with your own :)

---

### Bingo, it worked
