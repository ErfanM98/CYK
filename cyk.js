
/*


let the input be a string I consisting of n characters: a1 ... an.
let the grammar contain r nonterminal symbols R1 ... Rr, with start symbol R1.
let P[n,n,r] be an array of booleans. Initialize all elements of P to false.

for each s = 1 to n
    for each unit production Rv → as
        set P[1,s,v] = true

for each l = 2 to n -- Length of span
    for each s = 1 to n-l+1 -- Start of span
        for each p = 1 to l-1 -- Partition of span
            for each production Ra    → Rb Rc
                if P[p,s,b] and P[l-p,s+p,c] then set P[l,s,a] = true

if P[n,1,1] is true then
    I is member of language
else
    I is not member of language

 */

// let the input be a string I consisting of n characters: a1 ... an.

// let I = "erfan";
let I = [null , "she" , "eats", "a" , "fish", "with", "a", "fork"];
let n = I.length - 1; // n

// let the grammar contain r nonterminal symbols R1 ... Rr, with start symbol R1.
let variables = [null , 'S', 'VP', 'PP', 'NP', 'V', 'P', 'N', 'D'];
r = variables.length - 1 ;

unit_productions = {'she' : ['NP'] ,
    'eats' : ['VP' , 'V'],
    'with' : ['P'],
    'a' : ['D'],
    'fish': ['N'],
    'fork' : ['N']
};
productions = [
    {'S' : ['NP' , 'VP']} ,
    {'VP' : ['VP' , 'PP']},
    {'VP' : ['V' , 'NP']},
    {'PP' : ['P' , 'NP']},
    {'NP' : ['D' , 'N']}
]

// let P[n,n,r] be an array of booleans. Initialize all elements of P to false.
P = new Array(n+1);

let i = 0;
for (i = 0; i <= n; i++){
    P[i] = new Array(n+1);
    for (j = 0; j <= r; j++){
        P[i][j] = new Array(r+1);
        for (k = 0; k <= r; k++){
            P[i][j][k] = false;
        }
    }
}

for (s = 1; s <= n; s++){
    // for each unit production Rv → as
    for(i = 0; i < unit_productions[I[s]].length; i++){
        v = variables.indexOf(unit_productions[I[s]][i]);
        // P[0][s][v] = true;
        P[1][s][v] = true;

    }
}

for(l = 2;l <= n; l++){

    for (s = 1; s <= n - l + 1; s++){

        for (p = 1; p <= l - 1; p++){

            // for each production Ra → Rb Rc

            productions.forEach(function (rule) {
                var Ra = Object.keys(rule)[0];
                a = variables.indexOf(Ra);
                b = variables.indexOf(rule[Ra][0]);
                c = variables.indexOf(rule[Ra][1]);

                if(P[p][s][b] && P[l-p][s+p][c]){
                    // P[l,s,a] = true
                    P[l][s][a] = true
                    console.log("true");
                }

            })

        }

    }

}

window.P = P;

result = document.getElementById("result");
if(P[n][1][1]){
    result.innerHTML = "The string can be generated with the given grammar";
}
else {
    result.innerHTML = "The string can not be generated with the given grammar";
}
