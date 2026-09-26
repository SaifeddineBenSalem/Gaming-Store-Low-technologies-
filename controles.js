var age = 0;
var nom ;
    nom= prompt("Donner votre nom");
while(age<18 || age>100){
    age = prompt("Donner votre age");
    age = parseInt(age);
    if(age<18 || age>100){
        alert("Erreur! Vous devez etre +18 pour commander des articles");
    }else{
        alert("Bienvenue "+nom+" dans notre site web !");
    }  
}