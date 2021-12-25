```typescript
class Animal {
    constructor() {
        this.speak();
    }
    speak() {
        
    }
}
class Snake extends Animal {
    abc={ 
        a:123
    }
    constructor() {
        super();
        this.speak();
    }
    speak() {
        console.log(this.abc.a); // error
    }
}
let sam = new Snake("Sammy the Python"); 
```