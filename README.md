### Taskw

Node.js library that provides functionality to query and modify task warrior
data.

#### How it works

Library communicates with task warrior by invoking `task` shell command and
parses its output.

Export command is used where it is posible.

#### How to use

``` js
var query = {
    project: 'tempos',
    description: { value: 'up', predicate: 'contains' },
    status: 'completed'
};

Task.where(query).then(function(result) {
    // This will result in
    // "task project:tempos description.contains:up \
    // status:completed export rc.json.array=on" shell command to be run

    console.log(result);
});

Project.all().then(function(result) {
    console.log(result);
});
```

#### How to contribute

Project infrastructure is not setted up, so create an issue
