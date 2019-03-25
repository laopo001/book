> std::include!宏

使用include!宏包含了另一个文件

> std::concat!

合并字符串，生成&'static str类型的表达式
```
let s = concat!("test", 10, 'b', true);
assert_eq!(s, "test10btrue");
```

> std::include_str!

接受一个utf8编码的文件作为string，也是&'static str。
```
let secret_key = include_str!("secret-key.ascii");
```

> std::env!

在编译时插入环境变量。
```
let path: &'static str = env!("PATH");
println!("the $PATH variable at the time of compiling was: {}", path);
```

> std::file!

获取本文件的路径。
```
let this_file = file!();
println!("defined in file: {}", this_file);
```

> std::stringify!

字符串化其参数的宏。
```
let one_plus_one = stringify!(1 + 1);
assert_eq!(one_plus_one, "1 + 1");
```