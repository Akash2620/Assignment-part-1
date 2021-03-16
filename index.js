
const readline = require("readline");

const fs = require("fs");


var filenames = []

function main() {
    try {

        var data = fs.readFileSync('filenames.txt', 'utf8');
        var readfilenames = data.toString();
        if (readfilenames !== "") {
            readfilenames = readfilenames.split("\n");
            readfilenames = readfilenames.map(filename => {
                filenames.push(filename.replace("\r", ""));
            })
            userinput();
        }
        else {
            userinput();
        }
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

main()



function userinput() {
    //create readline instannce
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    //prompt user to enter filename
    rl.question("Please Enter filename : ", function (filename) {
        //if the name already exists then :-
        if (filenames.includes(filename)) {
            //display msg that file already exists
            console.log("File already exists");
            //close the readline instance
            rl.close();
            //take userinput again
            return userinput();
        }
        //if the name is unique then :-
        else {
            //push the new name in filenames array
            filenames.push(filename);
            //edit the file which has all the filenames, add the new name
            editFileNames(filenames)
            //create the new file 
            createNewFile(filename);
            rl.close();
        }
    });
}
//this function takes list of filenames
function editFileNames(files) {
    //converts the array into string
    var str = "";
    for (let i = 0; i < files.length; i++) {
        str = str + files[i] + '\n';
    }
    //write the string to the filenames.txt file
    fs.writeFile("./filenames.txt", str, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}
//this function takes a filename as an argument and creates a new file with content "You are awesome"
function createNewFile(filename) {
    fs.writeFile(filename + '.txt', 'You are awesome', function (err) {
        if (err) throw err;
    });
}